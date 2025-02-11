/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryDto } from '../../models/category-dto';
import { UpdateCategoryDto } from '../../models/update-category-dto';

export interface CategoryControllerUpdate$Params {
    id: string;
    body: UpdateCategoryDto;
}

export function categoryControllerUpdate(
    http: HttpClient,
    rootUrl: string,
    params: CategoryControllerUpdate$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<CategoryDto>> {
    const rb = new RequestBuilder(rootUrl, categoryControllerUpdate.PATH, 'put');
    if (params) {
        rb.path('id', params.id, {});
        rb.body(params.body, 'application/json');
    }

    return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<CategoryDto>;
        }),
    );
}

categoryControllerUpdate.PATH = '/api/v1/words/category/{id}';
