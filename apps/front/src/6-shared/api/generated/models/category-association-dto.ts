/* tslint:disable */
/* eslint-disable */
import { WordDto } from '../models/word-dto';
export interface CategoryAssociationDto {
    categoryId: number;
    dictionary?: WordDto;
    id: number;
    vocabularyId?: number;
    wordId?: number;
}
