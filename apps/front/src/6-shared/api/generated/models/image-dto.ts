/* tslint:disable */
/* eslint-disable */
import { ImageProvider } from '../models/image-provider';
export interface ImageDto {
    authorLink?: string;
    authorName?: string;
    blurHash?: string;
    description?: string;
    externalId?: string;
    id: number;
    provider?: ImageProvider;
    url: string;
    urls: {
        [key: string]: any;
    };
}
