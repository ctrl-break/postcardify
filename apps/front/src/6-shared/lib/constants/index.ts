import { HttpHeaders } from '@angular/common/http';
import { env } from '../../config/env';

export const API = env.api;

export const API_VERS = API + '/api/v1';

export const PATH_AUTH = '/auth';
export const API_AUTH = API_VERS + PATH_AUTH;

export const INFINITE_SCROLL_PAGE_SIZE = 100;

export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
