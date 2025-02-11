/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VocabularyDto } from '../../models/vocabulary-dto';

export interface VocabularyControllerFindOne$Params {
    id: string;
}

export function vocabularyControllerFindOne(
    http: HttpClient,
    rootUrl: string,
    params: VocabularyControllerFindOne$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<VocabularyDto>> {
    const rb = new RequestBuilder(rootUrl, vocabularyControllerFindOne.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<VocabularyDto>;
        }),
    );
}

vocabularyControllerFindOne.PATH = '/api/v1/words/vocabulary/{id}';
