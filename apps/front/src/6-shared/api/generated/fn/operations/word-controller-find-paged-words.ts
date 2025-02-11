/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WordDto } from '../../models/word-dto';

export interface WordControllerFindPagedWords$Params {
    page: string;
    perPage: string;
}

export function wordControllerFindPagedWords(
    http: HttpClient,
    rootUrl: string,
    params: WordControllerFindPagedWords$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<Array<WordDto>>> {
    const rb = new RequestBuilder(rootUrl, wordControllerFindPagedWords.PATH, 'get');
    if (params) {
        rb.query('page', params.page, {});
        rb.query('perPage', params.perPage, {});
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<Array<WordDto>>;
        }),
    );
}

wordControllerFindPagedWords.PATH = '/api/v1/words/word';
