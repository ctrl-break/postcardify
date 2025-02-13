import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-words-alphabet',
    imports: [CommonModule],
    templateUrl: './words-alphabet.component.html',
    styleUrl: './words-alphabet.component.scss',
})
export class WordsAlphabetComponent {
    router = inject(Router);

    public alphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    getLetterRoute(letter: string): string {
        const urlSegments = this.router.url.split('/');

        if (urlSegments.includes('words')) {
            const wordsIndex = urlSegments.indexOf('words');
            const listIndex = urlSegments.indexOf('list');

            if (listIndex !== -1) {
                return `/words/${urlSegments[wordsIndex + 1]}/list/letter/${letter}`;
            }
        }

        if (urlSegments.includes('cards')) {
            return `/cards/letter/${letter}`;
        }

        return '/';
    }

    goToLetter(letter: string) {
        const newUrl = this.getLetterRoute(letter);
        this.router.navigateByUrl(newUrl);
    }
}
