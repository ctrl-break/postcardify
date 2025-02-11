/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateVocabularyDto } from '../../models/create-vocabulary-dto';
import { VocabularyDto } from '../../models/vocabulary-dto';

export interface VocabularyControllerCreate$Params {
    body: CreateVocabularyDto;
}

export function vocabularyControllerCreate(
    http: HttpClient,
    rootUrl: string,
    params: VocabularyControllerCreate$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<VocabularyDto>> {
    const rb = new RequestBuilder(rootUrl, vocabularyControllerCreate.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<VocabularyDto>;
        }),
    );
}

vocabularyControllerCreate.PATH = '/api/v1/words/vocabulary';
