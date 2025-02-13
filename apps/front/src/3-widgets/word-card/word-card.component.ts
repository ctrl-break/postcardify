import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { PostcardComponent } from '@/features/postcard';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';
import { ImageDto, VocabularyService, WordDto, WordService } from '@/shared/api/generated';

@Component({
    selector: 'app-word-card',
    imports: [CommonModule, PostcardComponent],
    templateUrl: './word-card.component.html',
    styleUrl: './word-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordCardComponent {
    vocabularyService = inject(VocabularyService);
    wordService = inject(WordService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    userStore = inject(UserStore);
    vocabularyStore = inject(VocabularyStore);

    isVocabularyRoute = false;
    wordId?: string;
    isVocabulary = false;

    wordId$ = this.route.data.pipe(
        tap((res) => {
            this.isVocabularyRoute = res?.['type'] === 'vocabulary';
        }),
        switchMap(() => this.route.params.pipe(map(({ id }) => id))),
        tap((id) => (this.wordId = id)),
        tap(() => {
            this.isVocabulary = !!this.vocabularyStore
                .wordIds()
                .find((voc) =>
                    this.isVocabularyRoute
                        ? voc.vocabularyId?.toString() === this.wordId
                        : voc.wordId?.toString() === this.wordId,
                );
        }),
    );
    word$: Observable<WordDto> = this.wordId$.pipe(
        switchMap((id) => this.getWord(id)),
        catchError((err) => {
            console.error(err);
            if (err.status === 404) {
                this.router.navigate(['/cards']);
            }
            return of();
        }),
    );
    wordImage$ = this.wordId$.pipe(switchMap((id) => this.updateWordImage(id)));

    getWord = (id: string): Observable<WordDto> =>
        this.isVocabularyRoute
            ? this.vocabularyService.vocabularyControllerFindOne({ id }).pipe(
                  map((voc) => ({
                      ...voc.word!,
                  })),
              )
            : this.wordService.wordControllerFindOne({ id });

    getWordIdFromVocabulary(id: string): string {
        return (
            this.vocabularyStore
                .wordIds()
                .find((voc) => voc.vocabularyId.toString() === id)
                ?.wordId?.toString() ?? ''
        );
    }

    updateWordImage = (id: string): Observable<ImageDto | null> => {
        if (this.isVocabularyRoute) {
            const wordId = this.getWordIdFromVocabulary(id);
            return this.wordService.wordControllerFindOneAndUpdateImage({
                id: wordId,
            });
        }
        return this.wordService.wordControllerFindOneAndUpdateImage({ id });
    };
}
