import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
    @IsEmail({}, { message: 'Неверный формат email' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
    password: string;
}
