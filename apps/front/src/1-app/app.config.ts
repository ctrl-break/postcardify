import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ApiConfiguration } from '@/shared/api/generated';
import { API } from '@/shared/lib';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authInterceptor])),
        { provide: ApiConfiguration, useValue: { rootUrl: API } },
    ],
};
