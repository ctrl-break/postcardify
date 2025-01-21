import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtPayload } from '../token.model';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: JwtPayload) {
		const user: User | null = await this.userService.findById(payload.id).catch((err) => {
			console.error(err);
			return null;
		});
		if (!user || user.isBlocked) {
			throw new UnauthorizedException();
		}
		return payload;
	}
}
