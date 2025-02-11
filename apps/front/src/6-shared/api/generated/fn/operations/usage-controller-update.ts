/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateUsageDto } from '../../models/update-usage-dto';
import { WordUsageDto } from '../../models/word-usage-dto';

export interface UsageControllerUpdate$Params {
    id: string;
    body: UpdateUsageDto;
}

export function usageControllerUpdate(
    http: HttpClient,
    rootUrl: string,
    params: UsageControllerUpdate$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<WordUsageDto>> {
    const rb = new RequestBuilder(rootUrl, usageControllerUpdate.PATH, 'put');
    if (params) {
        rb.path('id', params.id, {});
        rb.body(params.body, 'application/json');
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<WordUsageDto>;
        }),
    );
}

usageControllerUpdate.PATH = '/api/v1/words/usage/{id}';
