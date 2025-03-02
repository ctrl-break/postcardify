/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { WordService } from './services/word.service';
import { VocabularyService } from './services/vocabulary.service';
import { UsageService } from './services/usage.service';
import { ImageService } from './services/image.service';
import { CategoryService } from './services/category.service';
import { ProfileService } from './services/profile.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        AppService,
        AuthService,
        SettingsService,
        WordService,
        VocabularyService,
        UsageService,
        ImageService,
        CategoryService,
        ProfileService,
        ApiConfiguration,
    ],
})
export class ApiModule {
    static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfiguration,
                    useValue: params,
                },
            ],
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error(
                'You need to import the HttpClientModule in your AppModule! \n' +
                    'See also https://github.com/angular/angular/issues/20575',
            );
        }
    }
}
