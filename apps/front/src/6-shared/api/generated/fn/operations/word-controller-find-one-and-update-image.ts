/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ImageDto } from '../../models/image-dto';

export interface WordControllerFindOneAndUpdateImage$Params {
    id: string;
}

export function wordControllerFindOneAndUpdateImage(
    http: HttpClient,
    rootUrl: string,
    params: WordControllerFindOneAndUpdateImage$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<ImageDto>> {
    const rb = new RequestBuilder(rootUrl, wordControllerFindOneAndUpdateImage.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<ImageDto>;
        }),
    );
}

wordControllerFindOneAndUpdateImage.PATH = '/api/v1/words/word/{id}/update-image';
