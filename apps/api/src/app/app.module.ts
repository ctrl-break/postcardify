import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { CommonModule } from './common/common.module';
import { WordModule } from './word/word.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { ProfileModule } from './profile/profile.module';

@Module({
	imports: [
		UserModule,
		PrismaModule,
		AuthModule,
		ConfigModule.forRoot({ isGlobal: true }),
		CommonModule,
		WordModule,
		ProfileModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
