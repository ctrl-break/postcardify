import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { WordDto, WordService } from '@/shared/api/generated';
import { PostcardComponent } from '@/features/postcard';

@Component({
  selector: 'app-word-random',
  imports: [CommonModule, PostcardComponent],
  templateUrl: './word-random.component.html',
  styleUrl: './word-random.component.scss',
})
export class WordRandomComponent {

  apiService = inject(WordService);

  word$: Observable<WordDto> = this.apiService.wordControllerGetRandomWord();
}
