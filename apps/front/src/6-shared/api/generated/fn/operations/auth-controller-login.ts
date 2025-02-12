/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginDto } from '../../models/login-dto';

export interface AuthControllerLogin$Params {
    body: LoginDto;
}

export function authControllerLogin(
    http: HttpClient,
    rootUrl: string,
    params: AuthControllerLogin$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(rootUrl, authControllerLogin.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(rb.build({ responseType: 'text', accept: '*/*', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return (r as HttpResponse<any>).clone({
                body: undefined,
            }) as StrictHttpResponse<void>;
        }),
    );
}

authControllerLogin.PATH = '/api/v1/auth/login';
