import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SettingsItemComponent } from '@/features/settings-item';
import { UserStore } from '@/shared/lib/stores';

@Component({
    selector: 'app-settings-data',
    imports: [CommonModule, SettingsItemComponent],
    templateUrl: './settings-data.component.html',
    styleUrl: './settings-data.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDataComponent {
    userStore = inject(UserStore);
}
