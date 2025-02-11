/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateWordDto } from '../../models/update-word-dto';
import { WordDto } from '../../models/word-dto';

export interface WordControllerUpdate$Params {
    id: string;
    body: UpdateWordDto;
}

export function wordControllerUpdate(
    http: HttpClient,
    rootUrl: string,
    params: WordControllerUpdate$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<WordDto>> {
    const rb = new RequestBuilder(rootUrl, wordControllerUpdate.PATH, 'put');
    if (params) {
        rb.path('id', params.id, {});
        rb.body(params.body, 'application/json');
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<WordDto>;
        }),
    );
}

wordControllerUpdate.PATH = '/api/v1/words/word/{id}';
