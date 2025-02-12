import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from '../../common/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty()
    passwordRepeat: string;
}
