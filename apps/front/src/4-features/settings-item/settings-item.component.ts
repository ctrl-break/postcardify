import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserSettingDto } from '@/shared/api/generated';
import { MatForms } from '@/shared/ui/mat-forms';

@Component({
    selector: 'app-settings-item',
    imports: [CommonModule, MatForms],
    templateUrl: './settings-item.component.html',
    styleUrl: './settings-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsItemComponent {
    @Input() setting!: UserSettingDto;
}
