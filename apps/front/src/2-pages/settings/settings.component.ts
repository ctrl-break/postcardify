import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsDataComponent } from '@/widgets/settings-data/settings-data.component';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-settings',
    imports: [LayoutComponent, SettingsDataComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {}
