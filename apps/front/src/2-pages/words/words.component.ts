import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordsListComponent } from '@/widgets/words-list';
import { LayoutComponent } from '../layout';
import { WordsAlphabetComponent } from '@/widgets/words-alphabet/words-alphabet.component';

@Component({
    selector: 'app-words',
    imports: [LayoutComponent, WordsListComponent, WordsAlphabetComponent],
    templateUrl: './words.component.html',
    styleUrl: './words.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsComponent {}
