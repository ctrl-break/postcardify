/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { appControllerGetData } from '../fn/operations/app-controller-get-data';
import { AppControllerGetData$Params } from '../fn/operations/app-controller-get-data';
import { authControllerLogin } from '../fn/operations/auth-controller-login';
import { AuthControllerLogin$Params } from '../fn/operations/auth-controller-login';
import { authControllerLogout } from '../fn/operations/auth-controller-logout';
import { AuthControllerLogout$Params } from '../fn/operations/auth-controller-logout';
import { authControllerRefreshTokens } from '../fn/operations/auth-controller-refresh-tokens';
import { AuthControllerRefreshTokens$Params } from '../fn/operations/auth-controller-refresh-tokens';
import { authControllerRegister } from '../fn/operations/auth-controller-register';
import { AuthControllerRegister$Params } from '../fn/operations/auth-controller-register';
import { CategoryAssociationDto } from '../models/category-association-dto';
import { categoryControllerCreate } from '../fn/operations/category-controller-create';
import { CategoryControllerCreate$Params } from '../fn/operations/category-controller-create';
import { categoryControllerFindBasicCategories } from '../fn/operations/category-controller-find-basic-categories';
import { CategoryControllerFindBasicCategories$Params } from '../fn/operations/category-controller-find-basic-categories';
import { categoryControllerFindOne } from '../fn/operations/category-controller-find-one';
import { CategoryControllerFindOne$Params } from '../fn/operations/category-controller-find-one';
import { categoryControllerFindUserCategories } from '../fn/operations/category-controller-find-user-categories';
import { CategoryControllerFindUserCategories$Params } from '../fn/operations/category-controller-find-user-categories';
import { categoryControllerFindWordsByCategory } from '../fn/operations/category-controller-find-words-by-category';
import { CategoryControllerFindWordsByCategory$Params } from '../fn/operations/category-controller-find-words-by-category';
import { categoryControllerRemove } from '../fn/operations/category-controller-remove';
import { CategoryControllerRemove$Params } from '../fn/operations/category-controller-remove';
import { categoryControllerUpdate } from '../fn/operations/category-controller-update';
import { CategoryControllerUpdate$Params } from '../fn/operations/category-controller-update';
import { CategoryDto } from '../models/category-dto';
import { imageControllerCreate } from '../fn/operations/image-controller-create';
import { ImageControllerCreate$Params } from '../fn/operations/image-controller-create';
import { imageControllerFindAll } from '../fn/operations/image-controller-find-all';
import { ImageControllerFindAll$Params } from '../fn/operations/image-controller-find-all';
import { imageControllerFindById } from '../fn/operations/image-controller-find-by-id';
import { ImageControllerFindById$Params } from '../fn/operations/image-controller-find-by-id';
import { imageControllerSearchImages } from '../fn/operations/image-controller-search-images';
import { ImageControllerSearchImages$Params } from '../fn/operations/image-controller-search-images';
import { ImageDto } from '../models/image-dto';
import { PageDto } from '../models/page-dto';
import { PageMetaDto } from '../models/page-meta-dto';
import { profileControllerGetProfileData } from '../fn/operations/profile-controller-get-profile-data';
import { ProfileControllerGetProfileData$Params } from '../fn/operations/profile-controller-get-profile-data';
import { ProfileDto } from '../models/profile-dto';
import { settingsControllerGetUserSettings } from '../fn/operations/settings-controller-get-user-settings';
import { SettingsControllerGetUserSettings$Params } from '../fn/operations/settings-controller-get-user-settings';
import { usageControllerCreate } from '../fn/operations/usage-controller-create';
import { UsageControllerCreate$Params } from '../fn/operations/usage-controller-create';
import { usageControllerFindUserWordUsages } from '../fn/operations/usage-controller-find-user-word-usages';
import { UsageControllerFindUserWordUsages$Params } from '../fn/operations/usage-controller-find-user-word-usages';
import { usageControllerFindWordUsages } from '../fn/operations/usage-controller-find-word-usages';
import { UsageControllerFindWordUsages$Params } from '../fn/operations/usage-controller-find-word-usages';
import { usageControllerRemove } from '../fn/operations/usage-controller-remove';
import { UsageControllerRemove$Params } from '../fn/operations/usage-controller-remove';
import { usageControllerUpdate } from '../fn/operations/usage-controller-update';
import { UsageControllerUpdate$Params } from '../fn/operations/usage-controller-update';
import { UserSettingDto } from '../models/user-setting-dto';
import { vocabularyControllerCreate } from '../fn/operations/vocabulary-controller-create';
import { VocabularyControllerCreate$Params } from '../fn/operations/vocabulary-controller-create';
import { vocabularyControllerFindOne } from '../fn/operations/vocabulary-controller-find-one';
import { VocabularyControllerFindOne$Params } from '../fn/operations/vocabulary-controller-find-one';
import { vocabularyControllerGetUserVocabulary } from '../fn/operations/vocabulary-controller-get-user-vocabulary';
import { VocabularyControllerGetUserVocabulary$Params } from '../fn/operations/vocabulary-controller-get-user-vocabulary';
import { vocabularyControllerRemove } from '../fn/operations/vocabulary-controller-remove';
import { VocabularyControllerRemove$Params } from '../fn/operations/vocabulary-controller-remove';
import { vocabularyControllerUpdate } from '../fn/operations/vocabulary-controller-update';
import { VocabularyControllerUpdate$Params } from '../fn/operations/vocabulary-controller-update';
import { VocabularyDto } from '../models/vocabulary-dto';
import { wordControllerCreate } from '../fn/operations/word-controller-create';
import { WordControllerCreate$Params } from '../fn/operations/word-controller-create';
import { wordControllerFindOne } from '../fn/operations/word-controller-find-one';
import { WordControllerFindOne$Params } from '../fn/operations/word-controller-find-one';
import { wordControllerFindOneAndUpdateImage } from '../fn/operations/word-controller-find-one-and-update-image';
import { WordControllerFindOneAndUpdateImage$Params } from '../fn/operations/word-controller-find-one-and-update-image';
import { wordControllerFindPagedWords } from '../fn/operations/word-controller-find-paged-words';
import { WordControllerFindPagedWords$Params } from '../fn/operations/word-controller-find-paged-words';
import { wordControllerRemove } from '../fn/operations/word-controller-remove';
import { WordControllerRemove$Params } from '../fn/operations/word-controller-remove';
import { wordControllerUpdate } from '../fn/operations/word-controller-update';
import { WordControllerUpdate$Params } from '../fn/operations/word-controller-update';
import { WordDto } from '../models/word-dto';
import { WordUsageDto } from '../models/word-usage-dto';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `appControllerGetData()` */
    static readonly AppControllerGetDataPath = '/api/v1';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `appControllerGetData()` instead.
     *
     * This method doesn't expect any request body.
     */
    appControllerGetData$Response(
        params?: AppControllerGetData$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return appControllerGetData(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `appControllerGetData$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    appControllerGetData(params?: AppControllerGetData$Params, context?: HttpContext): Observable<void> {
        return this.appControllerGetData$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `authControllerRegister()` */
    static readonly AuthControllerRegisterPath = '/api/v1/auth/register';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerRegister()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerRegister$Response(
        params: AuthControllerRegister$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return authControllerRegister(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `authControllerRegister$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerRegister(params: AuthControllerRegister$Params, context?: HttpContext): Observable<void> {
        return this.authControllerRegister$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `authControllerLogin()` */
    static readonly AuthControllerLoginPath = '/api/v1/auth/login';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerLogin()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerLogin$Response(
        params: AuthControllerLogin$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return authControllerLogin(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerLogin(params: AuthControllerLogin$Params, context?: HttpContext): Observable<void> {
        return this.authControllerLogin$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `authControllerLogout()` */
    static readonly AuthControllerLogoutPath = '/api/v1/auth/logout';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerLogout()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerLogout$Response(
        params?: AuthControllerLogout$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return authControllerLogout(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `authControllerLogout$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerLogout(params?: AuthControllerLogout$Params, context?: HttpContext): Observable<void> {
        return this.authControllerLogout$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `authControllerRefreshTokens()` */
    static readonly AuthControllerRefreshTokensPath = '/api/v1/auth/refresh-tokens';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerRefreshTokens()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerRefreshTokens$Response(
        params?: AuthControllerRefreshTokens$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return authControllerRefreshTokens(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `authControllerRefreshTokens$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerRefreshTokens(params?: AuthControllerRefreshTokens$Params, context?: HttpContext): Observable<void> {
        return this.authControllerRefreshTokens$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `settingsControllerGetUserSettings()` */
    static readonly SettingsControllerGetUserSettingsPath = '/api/v1/profile/settings';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `settingsControllerGetUserSettings()` instead.
     *
     * This method doesn't expect any request body.
     */
    settingsControllerGetUserSettings$Response(
        params?: SettingsControllerGetUserSettings$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<UserSettingDto>>> {
        return settingsControllerGetUserSettings(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `settingsControllerGetUserSettings$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    settingsControllerGetUserSettings(
        params?: SettingsControllerGetUserSettings$Params,
        context?: HttpContext,
    ): Observable<Array<UserSettingDto>> {
        return this.settingsControllerGetUserSettings$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<UserSettingDto>>): Array<UserSettingDto> => r.body),
        );
    }

    /** Path part for operation `wordControllerFindPagedWords()` */
    static readonly WordControllerFindPagedWordsPath = '/api/v1/words/word';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerFindPagedWords()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindPagedWords$Response(
        params: WordControllerFindPagedWords$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<WordDto>>> {
        return wordControllerFindPagedWords(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerFindPagedWords$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindPagedWords(
        params: WordControllerFindPagedWords$Params,
        context?: HttpContext,
    ): Observable<Array<WordDto>> {
        return this.wordControllerFindPagedWords$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<WordDto>>): Array<WordDto> => r.body),
        );
    }

    /** Path part for operation `wordControllerCreate()` */
    static readonly WordControllerCreatePath = '/api/v1/words/word';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerCreate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    wordControllerCreate$Response(
        params: WordControllerCreate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordDto>> {
        return wordControllerCreate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerCreate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    wordControllerCreate(params: WordControllerCreate$Params, context?: HttpContext): Observable<WordDto> {
        return this.wordControllerCreate$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordDto>): WordDto => r.body),
        );
    }

    /** Path part for operation `wordControllerFindOneAndUpdateImage()` */
    static readonly WordControllerFindOneAndUpdateImagePath = '/api/v1/words/word/{id}/update-image';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerFindOneAndUpdateImage()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindOneAndUpdateImage$Response(
        params: WordControllerFindOneAndUpdateImage$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<ImageDto>> {
        return wordControllerFindOneAndUpdateImage(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerFindOneAndUpdateImage$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindOneAndUpdateImage(
        params: WordControllerFindOneAndUpdateImage$Params,
        context?: HttpContext,
    ): Observable<ImageDto> {
        return this.wordControllerFindOneAndUpdateImage$Response(params, context).pipe(
            map((r: StrictHttpResponse<ImageDto>): ImageDto => r.body),
        );
    }

    /** Path part for operation `wordControllerFindOne()` */
    static readonly WordControllerFindOnePath = '/api/v1/words/word/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerFindOne()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindOne$Response(
        params: WordControllerFindOne$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordDto>> {
        return wordControllerFindOne(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerFindOne$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerFindOne(params: WordControllerFindOne$Params, context?: HttpContext): Observable<WordDto> {
        return this.wordControllerFindOne$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordDto>): WordDto => r.body),
        );
    }

    /** Path part for operation `wordControllerUpdate()` */
    static readonly WordControllerUpdatePath = '/api/v1/words/word/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerUpdate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    wordControllerUpdate$Response(
        params: WordControllerUpdate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordDto>> {
        return wordControllerUpdate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerUpdate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    wordControllerUpdate(params: WordControllerUpdate$Params, context?: HttpContext): Observable<WordDto> {
        return this.wordControllerUpdate$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordDto>): WordDto => r.body),
        );
    }

    /** Path part for operation `wordControllerRemove()` */
    static readonly WordControllerRemovePath = '/api/v1/words/word/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `wordControllerRemove()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerRemove$Response(
        params: WordControllerRemove$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordDto>> {
        return wordControllerRemove(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `wordControllerRemove$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    wordControllerRemove(params: WordControllerRemove$Params, context?: HttpContext): Observable<WordDto> {
        return this.wordControllerRemove$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordDto>): WordDto => r.body),
        );
    }

    /** Path part for operation `vocabularyControllerGetUserVocabulary()` */
    static readonly VocabularyControllerGetUserVocabularyPath = '/api/v1/words/vocabulary';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `vocabularyControllerGetUserVocabulary()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerGetUserVocabulary$Response(
        params?: VocabularyControllerGetUserVocabulary$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<VocabularyDto>>> {
        return vocabularyControllerGetUserVocabulary(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `vocabularyControllerGetUserVocabulary$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerGetUserVocabulary(
        params?: VocabularyControllerGetUserVocabulary$Params,
        context?: HttpContext,
    ): Observable<Array<VocabularyDto>> {
        return this.vocabularyControllerGetUserVocabulary$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<VocabularyDto>>): Array<VocabularyDto> => r.body),
        );
    }

    /** Path part for operation `vocabularyControllerCreate()` */
    static readonly VocabularyControllerCreatePath = '/api/v1/words/vocabulary';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `vocabularyControllerCreate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    vocabularyControllerCreate$Response(
        params: VocabularyControllerCreate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<VocabularyDto>> {
        return vocabularyControllerCreate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `vocabularyControllerCreate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    vocabularyControllerCreate(
        params: VocabularyControllerCreate$Params,
        context?: HttpContext,
    ): Observable<VocabularyDto> {
        return this.vocabularyControllerCreate$Response(params, context).pipe(
            map((r: StrictHttpResponse<VocabularyDto>): VocabularyDto => r.body),
        );
    }

    /** Path part for operation `vocabularyControllerFindOne()` */
    static readonly VocabularyControllerFindOnePath = '/api/v1/words/vocabulary/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `vocabularyControllerFindOne()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerFindOne$Response(
        params: VocabularyControllerFindOne$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<VocabularyDto>> {
        return vocabularyControllerFindOne(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `vocabularyControllerFindOne$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerFindOne(
        params: VocabularyControllerFindOne$Params,
        context?: HttpContext,
    ): Observable<VocabularyDto> {
        return this.vocabularyControllerFindOne$Response(params, context).pipe(
            map((r: StrictHttpResponse<VocabularyDto>): VocabularyDto => r.body),
        );
    }

    /** Path part for operation `vocabularyControllerUpdate()` */
    static readonly VocabularyControllerUpdatePath = '/api/v1/words/vocabulary/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `vocabularyControllerUpdate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    vocabularyControllerUpdate$Response(
        params: VocabularyControllerUpdate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<VocabularyDto>> {
        return vocabularyControllerUpdate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `vocabularyControllerUpdate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    vocabularyControllerUpdate(
        params: VocabularyControllerUpdate$Params,
        context?: HttpContext,
    ): Observable<VocabularyDto> {
        return this.vocabularyControllerUpdate$Response(params, context).pipe(
            map((r: StrictHttpResponse<VocabularyDto>): VocabularyDto => r.body),
        );
    }

    /** Path part for operation `vocabularyControllerRemove()` */
    static readonly VocabularyControllerRemovePath = '/api/v1/words/vocabulary/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `vocabularyControllerRemove()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerRemove$Response(
        params: VocabularyControllerRemove$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<VocabularyDto>> {
        return vocabularyControllerRemove(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `vocabularyControllerRemove$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    vocabularyControllerRemove(
        params: VocabularyControllerRemove$Params,
        context?: HttpContext,
    ): Observable<VocabularyDto> {
        return this.vocabularyControllerRemove$Response(params, context).pipe(
            map((r: StrictHttpResponse<VocabularyDto>): VocabularyDto => r.body),
        );
    }

    /** Path part for operation `usageControllerCreate()` */
    static readonly UsageControllerCreatePath = '/api/v1/words/usage';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usageControllerCreate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    usageControllerCreate$Response(
        params: UsageControllerCreate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordUsageDto>> {
        return usageControllerCreate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `usageControllerCreate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    usageControllerCreate(params: UsageControllerCreate$Params, context?: HttpContext): Observable<WordUsageDto> {
        return this.usageControllerCreate$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordUsageDto>): WordUsageDto => r.body),
        );
    }

    /** Path part for operation `usageControllerFindWordUsages()` */
    static readonly UsageControllerFindWordUsagesPath = '/api/v1/words/usage/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usageControllerFindWordUsages()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerFindWordUsages$Response(
        params: UsageControllerFindWordUsages$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<WordUsageDto>>> {
        return usageControllerFindWordUsages(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `usageControllerFindWordUsages$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerFindWordUsages(
        params: UsageControllerFindWordUsages$Params,
        context?: HttpContext,
    ): Observable<Array<WordUsageDto>> {
        return this.usageControllerFindWordUsages$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<WordUsageDto>>): Array<WordUsageDto> => r.body),
        );
    }

    /** Path part for operation `usageControllerUpdate()` */
    static readonly UsageControllerUpdatePath = '/api/v1/words/usage/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usageControllerUpdate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    usageControllerUpdate$Response(
        params: UsageControllerUpdate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordUsageDto>> {
        return usageControllerUpdate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `usageControllerUpdate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    usageControllerUpdate(params: UsageControllerUpdate$Params, context?: HttpContext): Observable<WordUsageDto> {
        return this.usageControllerUpdate$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordUsageDto>): WordUsageDto => r.body),
        );
    }

    /** Path part for operation `usageControllerRemove()` */
    static readonly UsageControllerRemovePath = '/api/v1/words/usage/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usageControllerRemove()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerRemove$Response(
        params: UsageControllerRemove$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<WordUsageDto>> {
        return usageControllerRemove(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `usageControllerRemove$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerRemove(params: UsageControllerRemove$Params, context?: HttpContext): Observable<WordUsageDto> {
        return this.usageControllerRemove$Response(params, context).pipe(
            map((r: StrictHttpResponse<WordUsageDto>): WordUsageDto => r.body),
        );
    }

    /** Path part for operation `usageControllerFindUserWordUsages()` */
    static readonly UsageControllerFindUserWordUsagesPath = '/api/v1/words/usage/{id}/user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usageControllerFindUserWordUsages()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerFindUserWordUsages$Response(
        params: UsageControllerFindUserWordUsages$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<WordUsageDto>>> {
        return usageControllerFindUserWordUsages(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `usageControllerFindUserWordUsages$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    usageControllerFindUserWordUsages(
        params: UsageControllerFindUserWordUsages$Params,
        context?: HttpContext,
    ): Observable<Array<WordUsageDto>> {
        return this.usageControllerFindUserWordUsages$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<WordUsageDto>>): Array<WordUsageDto> => r.body),
        );
    }

    /** Path part for operation `imageControllerFindAll()` */
    static readonly ImageControllerFindAllPath = '/api/v1/images';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `imageControllerFindAll()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerFindAll$Response(
        params?: ImageControllerFindAll$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<ImageDto>>> {
        return imageControllerFindAll(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `imageControllerFindAll$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerFindAll(params?: ImageControllerFindAll$Params, context?: HttpContext): Observable<Array<ImageDto>> {
        return this.imageControllerFindAll$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<ImageDto>>): Array<ImageDto> => r.body),
        );
    }

    /** Path part for operation `imageControllerCreate()` */
    static readonly ImageControllerCreatePath = '/api/v1/images';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `imageControllerCreate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    imageControllerCreate$Response(
        params: ImageControllerCreate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<ImageDto>> {
        return imageControllerCreate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `imageControllerCreate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    imageControllerCreate(params: ImageControllerCreate$Params, context?: HttpContext): Observable<ImageDto> {
        return this.imageControllerCreate$Response(params, context).pipe(
            map((r: StrictHttpResponse<ImageDto>): ImageDto => r.body),
        );
    }

    /** Path part for operation `imageControllerSearchImages()` */
    static readonly ImageControllerSearchImagesPath = '/api/v1/images/search';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `imageControllerSearchImages()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerSearchImages$Response(
        params: ImageControllerSearchImages$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<void>> {
        return imageControllerSearchImages(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `imageControllerSearchImages$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerSearchImages(params: ImageControllerSearchImages$Params, context?: HttpContext): Observable<void> {
        return this.imageControllerSearchImages$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body),
        );
    }

    /** Path part for operation `imageControllerFindById()` */
    static readonly ImageControllerFindByIdPath = '/api/v1/images/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `imageControllerFindById()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerFindById$Response(
        params: ImageControllerFindById$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<ImageDto>> {
        return imageControllerFindById(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `imageControllerFindById$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    imageControllerFindById(params: ImageControllerFindById$Params, context?: HttpContext): Observable<ImageDto> {
        return this.imageControllerFindById$Response(params, context).pipe(
            map((r: StrictHttpResponse<ImageDto>): ImageDto => r.body),
        );
    }

    /** Path part for operation `categoryControllerFindBasicCategories()` */
    static readonly CategoryControllerFindBasicCategoriesPath = '/api/v1/words/category';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerFindBasicCategories()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindBasicCategories$Response(
        params?: CategoryControllerFindBasicCategories$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<CategoryDto>>> {
        return categoryControllerFindBasicCategories(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerFindBasicCategories$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindBasicCategories(
        params?: CategoryControllerFindBasicCategories$Params,
        context?: HttpContext,
    ): Observable<Array<CategoryDto>> {
        return this.categoryControllerFindBasicCategories$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body),
        );
    }

    /** Path part for operation `categoryControllerCreate()` */
    static readonly CategoryControllerCreatePath = '/api/v1/words/category';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerCreate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    categoryControllerCreate$Response(
        params: CategoryControllerCreate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<CategoryDto>> {
        return categoryControllerCreate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerCreate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    categoryControllerCreate(params: CategoryControllerCreate$Params, context?: HttpContext): Observable<CategoryDto> {
        return this.categoryControllerCreate$Response(params, context).pipe(
            map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body),
        );
    }

    /** Path part for operation `categoryControllerFindUserCategories()` */
    static readonly CategoryControllerFindUserCategoriesPath = '/api/v1/words/category/user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerFindUserCategories()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindUserCategories$Response(
        params?: CategoryControllerFindUserCategories$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<CategoryDto>>> {
        return categoryControllerFindUserCategories(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerFindUserCategories$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindUserCategories(
        params?: CategoryControllerFindUserCategories$Params,
        context?: HttpContext,
    ): Observable<Array<CategoryDto>> {
        return this.categoryControllerFindUserCategories$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body),
        );
    }

    /** Path part for operation `categoryControllerFindOne()` */
    static readonly CategoryControllerFindOnePath = '/api/v1/words/category/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerFindOne()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindOne$Response(
        params: CategoryControllerFindOne$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<CategoryDto>> {
        return categoryControllerFindOne(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerFindOne$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindOne(
        params: CategoryControllerFindOne$Params,
        context?: HttpContext,
    ): Observable<CategoryDto> {
        return this.categoryControllerFindOne$Response(params, context).pipe(
            map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body),
        );
    }

    /** Path part for operation `categoryControllerUpdate()` */
    static readonly CategoryControllerUpdatePath = '/api/v1/words/category/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerUpdate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    categoryControllerUpdate$Response(
        params: CategoryControllerUpdate$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<CategoryDto>> {
        return categoryControllerUpdate(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerUpdate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    categoryControllerUpdate(params: CategoryControllerUpdate$Params, context?: HttpContext): Observable<CategoryDto> {
        return this.categoryControllerUpdate$Response(params, context).pipe(
            map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body),
        );
    }

    /** Path part for operation `categoryControllerRemove()` */
    static readonly CategoryControllerRemovePath = '/api/v1/words/category/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerRemove()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerRemove$Response(
        params: CategoryControllerRemove$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<CategoryDto>> {
        return categoryControllerRemove(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerRemove$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerRemove(params: CategoryControllerRemove$Params, context?: HttpContext): Observable<CategoryDto> {
        return this.categoryControllerRemove$Response(params, context).pipe(
            map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body),
        );
    }

    /** Path part for operation `categoryControllerFindWordsByCategory()` */
    static readonly CategoryControllerFindWordsByCategoryPath = '/api/v1/words/category/{id}/list';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `categoryControllerFindWordsByCategory()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindWordsByCategory$Response(
        params: CategoryControllerFindWordsByCategory$Params,
        context?: HttpContext,
    ): Observable<
        StrictHttpResponse<
            PageDto & {
                data?: Array<CategoryAssociationDto>;
                meta?: PageMetaDto;
            }
        >
    > {
        return categoryControllerFindWordsByCategory(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `categoryControllerFindWordsByCategory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    categoryControllerFindWordsByCategory(
        params: CategoryControllerFindWordsByCategory$Params,
        context?: HttpContext,
    ): Observable<
        PageDto & {
            data?: Array<CategoryAssociationDto>;
            meta?: PageMetaDto;
        }
    > {
        return this.categoryControllerFindWordsByCategory$Response(params, context).pipe(
            map(
                (
                    r: StrictHttpResponse<
                        PageDto & {
                            data?: Array<CategoryAssociationDto>;
                            meta?: PageMetaDto;
                        }
                    >,
                ): PageDto & {
                    data?: Array<CategoryAssociationDto>;
                    meta?: PageMetaDto;
                } => r.body,
            ),
        );
    }

    /** Path part for operation `profileControllerGetProfileData()` */
    static readonly ProfileControllerGetProfileDataPath = '/api/v1/profile';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `profileControllerGetProfileData()` instead.
     *
     * This method doesn't expect any request body.
     */
    profileControllerGetProfileData$Response(
        params?: ProfileControllerGetProfileData$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<ProfileDto>> {
        return profileControllerGetProfileData(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `profileControllerGetProfileData$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    profileControllerGetProfileData(
        params?: ProfileControllerGetProfileData$Params,
        context?: HttpContext,
    ): Observable<ProfileDto> {
        return this.profileControllerGetProfileData$Response(params, context).pipe(
            map((r: StrictHttpResponse<ProfileDto>): ProfileDto => r.body),
        );
    }
}
