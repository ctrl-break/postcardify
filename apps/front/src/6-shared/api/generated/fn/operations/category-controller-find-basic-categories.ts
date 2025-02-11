/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryDto } from '../../models/category-dto';

export interface CategoryControllerFindBasicCategories$Params {}

export function categoryControllerFindBasicCategories(
    http: HttpClient,
    rootUrl: string,
    params?: CategoryControllerFindBasicCategories$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    const rb = new RequestBuilder(rootUrl, categoryControllerFindBasicCategories.PATH, 'get');
    if (params) {
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<Array<CategoryDto>>;
        }),
    );
}

categoryControllerFindBasicCategories.PATH = '/api/v1/words/category';
