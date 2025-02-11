import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, delay, map, of, scan, switchMap, tap } from 'rxjs';
import { WordsListItemComponent } from '@/features/words-list-item';
import { ApiService, CategoryAssociationDto } from '@/shared/api/generated';
import { INFINITE_SCROLL_PAGE_SIZE } from '@/shared/lib';
import { CategoryAssociation } from '@/shared/lib/models';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';
import { InfiniteScrollDirective } from '@/shared/ui/infinitive-scroll';

@Component({
    selector: 'app-words-list',
    imports: [CommonModule, WordsListItemComponent, InfiniteScrollDirective, MatProgressBarModule],
    templateUrl: './words-list.component.html',
    styleUrl: './words-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsListComponent {
    apiService = inject(ApiService);
    route = inject(ActivatedRoute);
    userStore = inject(UserStore);
    vocabularyStore = inject(VocabularyStore);

    currentPage$ = new BehaviorSubject(1);
    words$: Observable<CategoryAssociation[]> = combineLatest([
        combineLatest([this.route.params, this.currentPage$]).pipe(
            switchMap(([params, pageNumber]) => {
                this.categoryId = params['id'];
                return this.getPage(pageNumber);
            }),
            scan((acc, current) => [...acc, ...current]),
        ),
        toObservable(this.vocabularyStore.wordIds),
    ]).pipe(
        map(([words, vocabularyIds]) => {
            return words.map((word) => ({
                ...word,
                vocabularyId: word.wordId
                    ? vocabularyIds.find((voc) => voc.wordId === word.wordId)?.vocabularyId
                    : undefined,
            }));
        }),
    );

    categoryId: string | undefined;
    lastPage = 1;
    loading = false;

    getPage(pageNumber: number) {
        if (this.loading || !this.categoryId) {
            return of([]);
        }
        this.loading = true;
        const params = {
            id: this.categoryId.toString(),
            perPage: INFINITE_SCROLL_PAGE_SIZE.toString(),
            page: pageNumber.toString(),
        };
        return this.apiService.categoryControllerFindWordsByCategory(params).pipe(
            delay(300),
            tap(({ meta }) => {
                this.loading = false;
                this.lastPage = meta?.lastPage ?? 1;
            }),
            map(({ data }) => (data?.length ? data : [])),
        );
    }

    getNextPage() {
        this.currentPage$.next(this.currentPage$.value + 1);
    }

    wordTrackBy(index: number, word: CategoryAssociationDto) {
        return word.id;
    }
}
