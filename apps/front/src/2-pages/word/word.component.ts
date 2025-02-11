import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordCardComponent } from '@/widgets/word-card/word-card.component';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-word',
    imports: [LayoutComponent, WordCardComponent],
    templateUrl: './word.component.html',
    styleUrl: './word.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {}
