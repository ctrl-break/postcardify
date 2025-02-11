import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsListItemComponent } from './words-list-item.component';

describe('WordsListItemComponent', () => {
    let component: WordsListItemComponent;
    let fixture: ComponentFixture<WordsListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordsListItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WordsListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
