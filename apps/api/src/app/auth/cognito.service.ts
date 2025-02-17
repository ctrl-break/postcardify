import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    CognitoIdentityProviderClient,
    SignUpCommand,
    InitiateAuthCommand,
    SignUpCommandInput,
    ConfirmSignUpCommand,
    ConfirmSignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfirmSignUpDto, RefreshTokenDto, SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
    private cognitoClient: CognitoIdentityProviderClient;
    private appClientId: string;

    constructor(private readonly configService: ConfigService) {
        const region = this.configService.get<string>('AWS_REGION');
        if (!region) {
            throw new InternalServerErrorException('AWS_REGION не задан в конфигурации');
        }
        this.cognitoClient = new CognitoIdentityProviderClient({ region });
        this.appClientId = this.configService.get<string>('AWS_COGNITO_CLIENT_ID');
        if (!this.appClientId) {
            throw new InternalServerErrorException('AWS_COGNITO_CLIENT_ID не задан в конфигурации');
        }
    }

    /**
     * Регистрация нового пользователя
     */
    async signUp(signUpDto: SignUpDto) {
        const { email, password } = signUpDto;
        try {
            const params: SignUpCommandInput = {
                ClientId: this.appClientId,
                Username: email,
                Password: password,
                UserAttributes: [{ Name: 'email', Value: email }],
            };

            const command = new SignUpCommand(params);
            const result = await this.cognitoClient.send(command);
            return {
                message: 'Пользователь успешно зарегистрирован. Проверьте почту для подтверждения аккаунта.',
                result,
            };
        } catch (error: any) {
            // Обработка известных ошибок от Cognito
            if (error.name === 'UsernameExistsException') {
                throw new BadRequestException('Пользователь с таким email уже существует.');
            }
            if (error.name === 'InvalidPasswordException') {
                throw new BadRequestException('Пароль не соответствует требованиям безопасности.');
            }
            throw new InternalServerErrorException('Ошибка регистрации пользователя.');
        }
    }

    /**
     * Аутентификация (вход) пользователя
     */
    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
        try {
            const command = new InitiateAuthCommand({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.appClientId,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                },
            });
            const response = await this.cognitoClient.send(command);
            if (!response.AuthenticationResult) {
                throw new UnauthorizedException('Неверные учетные данные.');
            }
            return {
                message: 'Вход выполнен успешно.',
                tokens: response.AuthenticationResult,
            };
        } catch (error: any) {
            if (error.name === 'NotAuthorizedException' || error.name === 'UserNotFoundException') {
                throw new UnauthorizedException('Неверный email или пароль.');
            }
            throw new InternalServerErrorException('Ошибка входа в систему.');
        }
    }

    /**
     * Подтверждение регистрации пользователя по email
     */
    async confirmSignUp(confirmSignUpDto: ConfirmSignUpDto) {
        const { email, confirmationCode } = confirmSignUpDto;

        try {
            const params: ConfirmSignUpCommandInput = {
                ClientId: this.appClientId,
                Username: email,
                ConfirmationCode: confirmationCode,
            };

            const command = new ConfirmSignUpCommand(params);
            await this.cognitoClient.send(command);

            return { message: 'Email успешно подтверждён.' };
        } catch (error: any) {
            if (error.name === 'CodeMismatchException') {
                throw new BadRequestException('Неверный код подтверждения.');
            }
            if (error.name === 'ExpiredCodeException') {
                throw new BadRequestException('Код подтверждения истёк. Запросите новый.');
            }
            if (error.name === 'UserNotFoundException') {
                throw new BadRequestException('Пользователь не найден.');
            }
            throw new InternalServerErrorException('Ошибка подтверждения email.');
        }
    }

    /**
     * Обновление access токена с использованием refresh токена
     */
    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        try {
            const command = new InitiateAuthCommand({
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                ClientId: this.appClientId,
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken,
                },
            });
            const response = await this.cognitoClient.send(command);
            if (!response.AuthenticationResult) {
                throw new UnauthorizedException('Ошибка обновления токена.');
            }
            return {
                message: 'Токен успешно обновлён.',
                tokens: response.AuthenticationResult,
            };
        } catch (error: any) {
            throw new InternalServerErrorException('Ошибка обновления токена.');
        }
    }
}
