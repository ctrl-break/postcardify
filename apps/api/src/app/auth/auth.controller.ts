import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpStatus,
	Post,
	Res,
	UnauthorizedException,
	UseInterceptors,
} from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Tokens } from './token.model';
import { LoginDto, RegisterDto } from './dto';
import { Cookie, Public, UserAgent } from '../common/decorators';

const REFRESH_TOKEN = 'refreshToken';

@Public()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		// private readonly httpService: HttpService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('register')
	async register(@Body() dto: RegisterDto, @Res() res: Response, @UserAgent() agent: string) {
		const tokens = await this.authService.register(dto, agent);
		if (!tokens) {
			throw new BadRequestException(`Can't register user with data ${JSON.stringify(dto)}`);
		}
		this.setRefreshTokenToCookies(tokens, res);
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
		const tokens = await this.authService.login(dto, agent);
		if (!tokens) {
			throw new BadRequestException(`Can't login with data ${JSON.stringify(dto)}`);
		}
		this.setRefreshTokenToCookies(tokens, res);
	}

	@Get('logout')
	async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
		if (!refreshToken) {
			res.sendStatus(HttpStatus.OK);
			return;
		}
		await this.authService.deleteRefreshToken(refreshToken);
		res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
		res.sendStatus(HttpStatus.OK);
	}

	@Get('refresh-tokens')
	async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string) {
		if (!refreshToken) {
			throw new UnauthorizedException();
		}
		const tokens = await this.authService.refreshTokens(refreshToken, agent);
		if (!tokens) {
			throw new UnauthorizedException();
		}
		this.setRefreshTokenToCookies(tokens, res);
	}

	private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
		if (!tokens) {
			throw new UnauthorizedException();
		}
		res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
			httpOnly: true,
			sameSite: 'lax',
			expires: new Date(tokens.refreshToken.exp),
			secure: this.configService.get('NODE_ENV', 'development') === 'production',
			path: '/',
		});
		res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
	}

	// @UseGuards(GoogleGuard)
	// @Get('google')
	// // eslint-disable-next-line @typescript-eslint/no-empty-function
	// googleAuth() {}

	// @UseGuards(GoogleGuard)
	// @Get('google/callback')
	// googleAuthCallback(@Req() req: Request, @Res() res: Response) {
	// 	const token = req.user['accessToken'];
	// 	return res.redirect(`http://localhost:3000/api/auth/success-google?token=${token}`);
	// }

	// @Get('success-google')
	// // eslint-disable-next-line @typescript-eslint/no-empty-function
	// successGoogle(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response) {
	// 	return this.httpService.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`).pipe(
	// 		mergeMap(({ data: { email } }) => this.authService.providerAuth(email, agent, Provider.GOOGLE)),
	// 		map((data) => this.setRefreshTokenToCookies(data, res)),
	// 		handleTimeoutAndErrors(),
	// 	);
	// }
}
