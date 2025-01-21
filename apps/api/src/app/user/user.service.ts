import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../common/services/password.service';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly passwordService: PasswordService,
	) {}

	async save(user: Partial<User>) {
		const hashedPassword = await this.passwordService.getHash(user.password);
		return this.prismaService.user.create({
			data: {
				email: user.email,
				password: hashedPassword,
				name: user.name,
			},
		});
	}

	findById(id: number) {
		return this.prismaService.user.findFirst({
			where: { id },
		});
	}

	findByEmail(email: string) {
		return this.prismaService.user.findFirst({
			where: { email },
		});
	}

	block(id: number) {
		return this.prismaService.user.update({ where: { id }, data: { isBlocked: true } });
	}
}
