/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface ImageControllerSearchImages$Params {
    query: string;
}

export function imageControllerSearchImages(
    http: HttpClient,
    rootUrl: string,
    params: ImageControllerSearchImages$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(rootUrl, imageControllerSearchImages.PATH, 'get');
    if (params) {
        rb.query('query', params.query, {});
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

imageControllerSearchImages.PATH = '/api/v1/images/search';
