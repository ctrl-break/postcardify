/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PageDto<T> {
    data: T[];

    meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}

export class PageMetaDto {
    @ApiProperty()
    total: number;

    @ApiProperty()
    lastPage: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty()
    perPage: number;

    @ApiProperty()
    prev: number;

    @ApiProperty()
    next: number;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(PageDto, model, PageMetaDto),
        ApiOkResponse({
            schema: {
                title: `Paged${model.name}`,
                allOf: [
                    { $ref: getSchemaPath(PageDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                            meta: {
                                type: 'object',
                                $ref: getSchemaPath(PageMetaDto),
                            },
                        },
                    },
                ],
            },
        }),
    );
};
