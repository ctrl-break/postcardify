import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordsListComponent } from '@/widgets/words-list';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-words',
    imports: [LayoutComponent, WordsListComponent],
    templateUrl: './words.component.html',
    styleUrl: './words.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsComponent {}
