import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@/shared/api/auth.service';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';
import { MatForms } from '@/shared/ui/mat-forms';

@Component({
    selector: 'app-profile-data',
    imports: [CommonModule, MatForms],
    templateUrl: './profile-data.component.html',
    styleUrl: './profile-data.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDataComponent {
    userStore = inject(UserStore);
    private authService = inject(AuthService);
    private router = inject(Router);
    private vocabularyStore = inject(VocabularyStore);
    private cookieService = inject(CookieService);

    isRunningLogout = false;

    goToSettings() {
        this.router.navigateByUrl('/settings');
    }

    logout() {
        if (this.isRunningLogout) {
            return;
        }
        this.isRunningLogout = true;
        // BUG - failed with json parse error on subscribe in console
        this.authService.logout().subscribe();
        // this functions must run after subscribe
        this.cookieService.delete('accessToken');
        this.userStore.resetProfile();
        this.vocabularyStore.resetVocabulary();
        this.router.navigateByUrl('/signin');
    }
}
