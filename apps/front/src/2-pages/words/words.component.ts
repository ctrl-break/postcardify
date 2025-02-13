import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WordsListComponent } from '@/widgets/words-list';
import { LayoutComponent } from '../layout';
import { WordsAlphabetComponent } from '@/widgets/words-alphabet/words-alphabet.component';
import { distinctUntilKeyChanged, switchMap, tap } from 'rxjs';
import { CategoryService } from '@/shared/api/generated';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-words',
    imports: [CommonModule, LayoutComponent, WordsListComponent, WordsAlphabetComponent],
    templateUrl: './words.component.html',
    styleUrl: './words.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsComponent {
    route = inject(ActivatedRoute);
    router = inject(Router);
    categoryService = inject(CategoryService);

    category$ = this.route.params.pipe(
        distinctUntilKeyChanged('id'),
        switchMap((params) => this.categoryService.categoryControllerFindOne({ id: params['id'] })),
    );

    goToCategories() {
        this.router.navigate(['/words']);
    }
}
