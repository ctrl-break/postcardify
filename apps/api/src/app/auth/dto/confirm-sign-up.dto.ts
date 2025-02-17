import { IsEmail, IsString } from 'class-validator';

export class ConfirmSignUpDto {
    @IsEmail({}, { message: 'Неверный формат email' })
    email: string;

    @IsString({ message: 'Код подтверждения должен быть строкой' })
    confirmationCode: string;
}
