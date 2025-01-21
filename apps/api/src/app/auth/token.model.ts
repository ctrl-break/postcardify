import { Token, Role } from '@prisma/client';
import { Request } from 'express';

export interface Tokens {
	accessToken: string;
	refreshToken: Token;
}

export interface JwtPayload {
	id: number;
	email: string;
	role: Role;
}

export interface UserRequest extends Request {
	user?: JwtPayload;
}
