import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { InitialLoaderComponent } from '@/widgets/initial-loader';
import { ThemeService } from '@/shared/lib/providers';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, MatSidenavModule, InitialLoaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    isStoresLoaded = false;

    themeService = inject(ThemeService);
    userStore = inject(UserStore);
    vocabularyStore = inject(VocabularyStore);

    init$: Observable<boolean> = combineLatest([
        toObservable(this.userStore.isInited),
        toObservable(this.vocabularyStore.isInited),
    ]).pipe(
        tap(() => (this.isStoresLoaded = true)),
        map(([userInited, vocabularyInited]) => userInited && vocabularyInited),
    );
}
