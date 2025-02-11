import { CategoryAssociationDto, WordDto } from '@/shared/api/generated';

export interface Word extends WordDto {
    isVocabulary: boolean;
}

export interface CategoryAssociation extends CategoryAssociationDto {
    vocabularyId?: number;
}
