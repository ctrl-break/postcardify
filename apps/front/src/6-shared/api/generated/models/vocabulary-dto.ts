/* tslint:disable */
/* eslint-disable */
import { WordDto } from '../models/word-dto';
export interface VocabularyDto {
    createdAt: string;
    id: number;
    imageId?: number;
    meaning?: string;
    transcription?: string;
    translation?: string;
    updatedAt: string;
    userId: number;
    userWord: string;
    word?: WordDto;
    wordId?: number;
}
