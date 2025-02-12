import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { STRATEGIES } from './strategy';
import { GUARDS } from './guards';
import { JwtModule } from '@nestjs/jwt';
import { options } from './config';
import { SettingsModule } from '../profile/settings/settings.module';

@Module({
    imports: [PassportModule, UserModule, SettingsModule, JwtModule.registerAsync(options())],
    providers: [AuthService, ...STRATEGIES, ...GUARDS],
    controllers: [AuthController],
})
export class AuthModule {}
