import { computed, inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withHooks, withMethods, withState, patchState, withComputed } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { sortByLowerCaseUserWord } from '../helpers';
import { VocabularyDto, VocabularyService } from '@/shared/api/generated';

export interface VocabularyState {
    isInited: boolean;
    vocabulary: VocabularyDto[];
}

const initialState: VocabularyState = {
    isInited: false,
    vocabulary: [],
};

export const VocabularyStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withDevtools('vocabulary'),
    withComputed(({ vocabulary }) => ({
        wordIds: computed(() =>
            vocabulary()
                .filter((voc) => voc.wordId)
                .map((voc) => ({ vocabularyId: voc.id, wordId: voc.wordId })),
        ),
    })),
    withMethods((store, vocService = inject(VocabularyService)) => ({
        initVocabulary() {
            return firstValueFrom(vocService.vocabularyControllerGetUserVocabulary()).then((vocabulary) => {
                patchState(store, {
                    isInited: true,
                    vocabulary: vocabulary.sort(sortByLowerCaseUserWord),
                });
            });
        },
        async addToVocabulary(wordId: number) {
            const params = { body: { wordId } };
            const word = await firstValueFrom(vocService.vocabularyControllerCreate(params));
            console.log(store.vocabulary(), word);

            patchState(store, {
                vocabulary: [...store.vocabulary(), word].sort(sortByLowerCaseUserWord),
            });
        },

        async removeFromVocabulary(wordId: number) {
            const vocabularyId = store.vocabulary().find((word) => word.wordId === wordId)?.id;
            if (!vocabularyId) {
                return;
            }
            const params = { id: vocabularyId.toString() };
            const word = await firstValueFrom(vocService.vocabularyControllerRemove(params));
            patchState(store, {
                vocabulary: [...store.vocabulary().filter((v) => v.id !== word.id)],
            });
        },

        resetVocabulary() {
            patchState(store, { vocabulary: [] });
        },
    })),
    withHooks({
        onInit(store) {
            store.initVocabulary();
        },
    }),
);
