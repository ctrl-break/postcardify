import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import {
    BehaviorSubject,
    delay,
    distinctUntilChanged,
    filter,
    map,
    of,
    scan,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';
import { WordsListItemComponent } from '@/features/words-list-item';
import { INFINITE_SCROLL_PAGE_SIZE } from '@/shared/lib';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';
import { InfiniteScrollDirective } from '@/shared/ui/infinitive-scroll';
import { CategoryAssociationDto, CategoryService } from '@/shared/api/generated';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-words-list',
    imports: [
        CommonModule,
        WordsListItemComponent,
        InfiniteScrollDirective,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './words-list.component.html',
    styleUrl: './words-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsListComponent {
    categoryService = inject(CategoryService);
    route = inject(ActivatedRoute);
    userStore = inject(UserStore);
    vocabularyStore = inject(VocabularyStore);

    params$ = this.route.params.pipe(
        map((params) => ({ categoryId: params['id'], letter: params['letter'] })),
        distinctUntilChanged((prev, curr) => prev.categoryId === curr.categoryId && prev.letter === curr.letter),
        tap((params) => {
            this.categoryId = params.categoryId;
            this.letter = params.letter;
            this.lastPage = 1;
            this.loading = false;
            this.currentPage$.next(1);
        }),
    );

    vocabularyWordIds$ = toObservable(this.vocabularyStore.wordIds);
    currentPage$ = new BehaviorSubject<number>(-1);
    words$ = this.currentPage$.pipe(
        filter((pageNumber) => pageNumber > 0),
        switchMap((pageNumber) =>
            this.getPage(pageNumber, this.letter).pipe(map((words) => ({ words, reset: pageNumber === 1 }))),
        ),
        scan((acc, { words, reset }) => (reset ? words : [...acc, ...words]), [] as CategoryAssociationDto[]),
        withLatestFrom(this.vocabularyWordIds$),
        map(([words, vocabularyIds]) =>
            words.map((word) => ({
                ...word,
                vocabularyId: word.wordId
                    ? vocabularyIds.find((voc) => voc.wordId === word.wordId)?.vocabularyId
                    : undefined,
            })),
        ),
    );

    categoryId: string | undefined;
    letter: string | undefined;
    lastPage = 1;
    loading = false;

    getPage(pageNumber: number, letter = '') {
        if (this.loading || !this.categoryId) {
            return of([]);
        }
        this.loading = true;
        const params = {
            id: this.categoryId.toString(),
            perPage: INFINITE_SCROLL_PAGE_SIZE.toString(),
            page: pageNumber.toString(),
        };

        const action$ = letter
            ? this.categoryService.categoryControllerFindWordsByCategoryAndFirstLetter({ ...params, letter })
            : this.categoryService.categoryControllerFindWordsByCategory(params);

        return action$.pipe(
            delay(300),
            tap(({ meta }) => {
                this.lastPage = meta?.lastPage ?? 1;
                this.loading = false;
            }),
            map(({ data }) => (data?.length ? data : [])),
        );
    }

    getNextPage() {
        if (this.loading) return;
        this.currentPage$.next(this.currentPage$.value + 1);
    }

    wordTrackBy(index: number, word: CategoryAssociationDto) {
        return word.id;
    }
}
