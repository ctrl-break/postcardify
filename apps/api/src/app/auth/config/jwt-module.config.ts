import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: config.get('JWT_EXP', '7d'),
        // expiresIn: config.get('JWT_EXP', '1m'),
    },
});

export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
