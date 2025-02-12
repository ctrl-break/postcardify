import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordRandomComponent } from './word-random.component';

describe('WordRandomComponent', () => {
    let component: WordRandomComponent;
    let fixture: ComponentFixture<WordRandomComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordRandomComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WordRandomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
