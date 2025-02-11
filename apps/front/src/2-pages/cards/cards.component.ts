import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WordsListItemComponent } from '@/features/words-list-item';
import { VocabularyStore } from '@/shared/lib/stores';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-cards',
    imports: [CommonModule, LayoutComponent, WordsListItemComponent],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent {
    vocabularyStore = inject(VocabularyStore);
}
