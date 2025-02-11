import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const userGuard: CanActivateFn = () => {
    const cookieService = inject(CookieService);
    const router = inject(Router);
    const isSignedIn = !!cookieService.get('accessToken');
    if (!isSignedIn) {
        router.navigateByUrl('/signin');
    }
    return isSignedIn;
};
