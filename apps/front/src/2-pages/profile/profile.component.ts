import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileDataComponent } from '@/widgets/profile-data/profile-data.component';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-profile',
    imports: [LayoutComponent, ProfileDataComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {}
