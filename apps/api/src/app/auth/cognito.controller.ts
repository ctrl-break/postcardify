import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './cognito.service';
import { Public } from '../common/decorators';
import { ConfirmSignUpDto, RefreshTokenDto, SignInDto, SignUpDto } from './dto';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('confirm-signup')
    async confirmSignUp(@Body() confirmSignUpDto: ConfirmSignUpDto) {
        return await this.authService.confirmSignUp(confirmSignUpDto);
    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }

    @Post('refresh')
    @HttpCode(200)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshTokenDto);
    }
}
