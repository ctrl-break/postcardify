import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NavComponent } from '@/features/nav';
import { MediaService, ThemeService } from '@/shared/lib/providers';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, NavComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    themeService = inject(ThemeService);
    mediaService = inject(MediaService);

    toggleTheme() {
        this.themeService.updateTheme();
    }
}
