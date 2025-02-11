import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsItemComponent } from './settings-item.component';

describe('SettingsItemComponent', () => {
    let component: SettingsItemComponent;
    let fixture: ComponentFixture<SettingsItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
