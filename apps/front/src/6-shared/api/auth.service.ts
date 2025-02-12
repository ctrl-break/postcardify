import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_AUTH, httpOptions } from '../lib';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private cookieService: CookieService) {}

    setTokensCookie(accessToken: string) {
        const decodedToken = jwtDecode(accessToken);
        const exp = decodedToken?.exp || 0;
        const expires = new Date(exp * 1000);
        this.cookieService.set('accessToken', accessToken, {
            expires,
            sameSite: 'Lax',
        });
    }

    signin(email: string, password: string): Observable<{ accessToken: string }> {
        return this.http.post<{ accessToken: string }>(
            `${API_AUTH}/login`,
            { email, password },
            { ...httpOptions, withCredentials: true },
        );
    }

    logout(): Observable<string> {
        return this.http.get<string>(`${API_AUTH}/logout`);
    }

    refreshToken(): Observable<{ accessToken: string }> {
        return this.http.get<{ accessToken: string }>(`${API_AUTH}/refresh-tokens`, {
            ...httpOptions,
            withCredentials: true,
        });
    }
}
