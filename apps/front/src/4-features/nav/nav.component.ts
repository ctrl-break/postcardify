import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-nav',
    imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink, RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
    @Input() color = 'primary';
    @Input() isMobile: boolean = false;

    navigation = [
        { link: '/cards', title: 'My cards' },
        { link: '/words', title: 'Words' },
        { link: '/profile', title: 'Profile' },
    ];
}
