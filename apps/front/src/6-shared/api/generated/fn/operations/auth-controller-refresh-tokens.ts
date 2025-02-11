/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface AuthControllerRefreshTokens$Params {}

export function authControllerRefreshTokens(
    http: HttpClient,
    rootUrl: string,
    params?: AuthControllerRefreshTokens$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(rootUrl, authControllerRefreshTokens.PATH, 'get');
    if (params) {
    }

    return http.request(rb.build({ responseType: 'text', accept: '*/*', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
        }),
    );
}

authControllerRefreshTokens.PATH = '/api/v1/auth/refresh-tokens';
