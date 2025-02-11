import { Injectable, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export type Themes = 'dark-theme' | 'light-theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    cookieService = inject(CookieService);
    currentTheme = this.cookieService.get('theme') || 'dark-theme';
    themeSignal = signal<Themes>(this.currentTheme as Themes);

    setTheme(theme: Themes) {
        this.themeSignal.set(theme);
        this.cookieService.set('theme', theme, { path: '/' });
    }

    updateTheme() {
        const newTheme: Themes = this.themeSignal() === 'dark-theme' ? 'light-theme' : 'dark-theme';
        this.themeSignal.update(() => newTheme);
        this.cookieService.set('theme', newTheme, { path: '/' });
    }
}
