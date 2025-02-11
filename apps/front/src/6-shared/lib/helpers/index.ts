import { VocabularyDto } from '@/shared/api/generated';

export const sortByLowerCaseUserWord = (a: VocabularyDto, b: VocabularyDto) =>
    a.userWord.toLowerCase() > b.userWord.toLowerCase() ? 1 : -1;
