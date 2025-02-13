import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordsAlphabetComponent } from './words-alphabet.component';

describe('WordsAlphabetComponent', () => {
    let component: WordsAlphabetComponent;
    let fixture: ComponentFixture<WordsAlphabetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordsAlphabetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WordsAlphabetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
