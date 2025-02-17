import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @IsEmail({}, { message: 'Неверный формат email' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    password: string;
}
