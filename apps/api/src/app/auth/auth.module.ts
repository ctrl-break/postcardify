import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { options } from './config';
import { UserModule } from '../user/user.module';
import { STRATEGIES } from './strategy';
import { GUARDS } from './guards';
import { SettingsModule } from '../profile/settings/settings.module';
import { AuthController } from './cognito.controller';
import { AuthService } from './cognito.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        // AuthService,
        PassportModule,
        ConfigModule,
        UserModule,
        SettingsModule,
        // JwtModule.registerAsync(options()),
    ],
    providers: [...STRATEGIES, ...GUARDS, AuthService],
    controllers: [
        AuthController,
        // CognitoController,
    ],
})
export class AuthModule {}
