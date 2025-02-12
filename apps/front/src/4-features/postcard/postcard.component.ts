import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageDto, WordDto } from '@/shared/api/generated';
import { MediaService } from '@/shared/lib/providers';
import { VocabularyStore } from '@/shared/lib/stores';

@Component({
    selector: 'app-postcard',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './postcard.component.html',
    styleUrl: './postcard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostcardComponent {
    @Input() word!: WordDto;
    @Input() wordImage?: ImageDto | null;
    @Input() isVocabulary?: boolean | null;
    @Input() showActions: boolean | null = true;

    private location = inject(Location);
    mediaService = inject(MediaService);
    vocabularyStore = inject(VocabularyStore);

    flipped = false;

    goBack() {
        this.location.back();
    }

    toggleVocabulary() {
        if (this.isVocabulary) {
            this.vocabularyStore.removeFromVocabulary(this.word.id);
        } else {
            this.vocabularyStore.addToVocabulary(this.word.id);
        }
        this.isVocabulary = !this.isVocabulary;
    }
}
