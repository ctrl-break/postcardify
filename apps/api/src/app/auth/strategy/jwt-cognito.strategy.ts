import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtCognitoStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        const userPoolId = configService.get<string>('AWS_COGNITO_USER_POOL_ID');
        const region = configService.get<string>('AWS_REGION');
        const jwksUri = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

        const options: StrategyOptions = {
            // Извлекаем токен из заголовка Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Не используем встроенную проверку секретом, так как будем получать его динамически
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri,
            }),
            // Верифицируем алгоритм
            algorithms: ['RS256'],
        };

        super(options);
    }

    async validate(payload: any) {
        // Здесь можно добавить дополнительные проверки (например, проверить scope или группы)
        console.log(payload);

        if (!payload) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
