import { ConflictException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { v4 } from 'uuid';
import { DateTime } from 'ts-luxon';

import { PrismaService } from '../prisma/prisma.service';
import { Tokens } from './token.model';
import { Token, User } from '@prisma/client';
import { RegisterDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordService } from '../common/services/password.service';
import { SettingsService } from '../profile/settings/settings.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly userService: UserService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly passwordService: PasswordService,
		private readonly settingService: SettingsService,
	) {}

	async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
		const token = await this.prismaService.token.delete({ where: { token: refreshToken } });
		if (!token || new Date(token.exp) < new Date()) {
			throw new UnauthorizedException();
		}
		const user = await this.userService.findById(token.userId);
		if (!user) {
			throw new UnauthorizedException();
		}
		return this.generateTokens(user, agent);
	}

	async register(dto: RegisterDto, agent: string) {
		const user: User | null = await this.userService.findByEmail(dto.email).catch((err) => {
			this.logger.error(err);
			return null;
		});
		if (user) {
			throw new ConflictException('The user with this email has already been registered');
		}
		const registeredUser = await this.userService.save(dto).catch((err) => {
			this.logger.error(err);
			return null;
		});
		if (!registeredUser) {
			throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
		this.settingService.createDefaultUserSettings(registeredUser.id);
		return this.generateTokens(registeredUser, agent);
	}

	async validateUser(email: string, pass: string): Promise<User | null> {
		const user = await this.userService.findByEmail(email);
		if (user) {
			const isPasswordOk = await this.passwordService.compareHash(pass, user.password);
			return isPasswordOk && !user.isBlocked ? user : null;
		}
		return null;
	}

	async login(dto: LoginDto, agent: string): Promise<Tokens> {
		const user = await this.validateUser(dto.email, dto.password);
		if (!user) {
			throw new UnauthorizedException('Invalid username or password');
		}
		return this.generateTokens(user, agent);
	}

	private async generateTokens(user: User, agent: string): Promise<Tokens> {
		const accessToken = this.jwtService.sign({
			id: user.id,
			email: user.email,
			role: user.role,
		});
		const refreshToken = await this.getRefreshToken(user.id, agent);
		return { accessToken, refreshToken };
	}

	private async getRefreshToken(userId: number, agent: string): Promise<Token> {
		const _token = await this.prismaService.token.findFirst({
			where: {
				userId,
				userAgent: agent,
			},
		});
		const token = _token?.token ?? v4();

		return this.prismaService.token.upsert({
			where: { token },
			update: {
				token: v4(),
				exp: DateTime.now().plus({ months: 12 }).toJSDate(),
			},
			create: {
				token,
				exp: DateTime.now().plus({ months: 12 }).toJSDate(),
				userId,
				userAgent: agent,
			},
		});
	}

	deleteRefreshToken(token: string) {
		return this.prismaService.token.delete({ where: { token } });
	}

	// async providerAuth(email: string, agent: string, provider: Provider) {
	// 	const userExists = await this.userService.findByEmail(email);
	// 	if (userExists) {
	// 		const user = await this.userService.save({ email, provider }).catch((err) => {
	// 			this.logger.error(err);
	// 			return null;
	// 		});
	// 		if (!user) {
	// 			return null;
	// 		}
	// 		return this.generateTokens(user, agent);
	// 	}
	// 	const user = await this.userService.save({ email, provider }).catch((err) => {
	// 		this.logger.error(err);
	// 		return null;
	// 	});
	// 	if (!user) {
	// 		throw new HttpException(`Не получилось создать пользователя с email ${email} в Google auth`, HttpStatus.BAD_REQUEST);
	// 	}
	// 	return this.generateTokens(user, agent);
	// }
}
