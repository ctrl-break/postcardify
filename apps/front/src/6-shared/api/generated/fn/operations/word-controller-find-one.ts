/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WordDto } from '../../models/word-dto';

export interface WordControllerFindOne$Params {
    id: string;
}

export function wordControllerFindOne(
    http: HttpClient,
    rootUrl: string,
    params: WordControllerFindOne$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<WordDto>> {
    const rb = new RequestBuilder(rootUrl, wordControllerFindOne.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<WordDto>;
        }),
    );
}

wordControllerFindOne.PATH = '/api/v1/words/word/{id}';
