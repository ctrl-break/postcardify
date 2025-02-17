import { IsString } from 'class-validator';

export class RefreshTokenDto {
    @IsString({ message: 'Refresh token должен быть строкой' })
    refreshToken: string;
}
