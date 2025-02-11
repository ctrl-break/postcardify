import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withHooks, withMethods, withState, patchState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { ApiService, ProfileDto, UserSettingDto } from '@/shared/api/generated';

export interface UserState {
    isInited: boolean;
    isSignedIn: boolean;
    isAdmin: boolean;
    profile: ProfileDto | null;
    userSettings: UserSettingDto[] | null;
}

const initialState: UserState = {
    isInited: false,
    isSignedIn: false,
    isAdmin: false,
    profile: null,
    userSettings: null,
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withDevtools('user'),
    withMethods((store, apiService = inject(ApiService)) => ({
        async initProfile() {
            const user = await firstValueFrom(apiService.profileControllerGetProfileData());
            const settings = await firstValueFrom(apiService.settingsControllerGetUserSettings());
            patchState(store, { profile: user, userSettings: settings, isInited: true });
        },

        resetProfile() {
            return patchState(store, { ...initialState });
        },
    })),
    withHooks({
        onInit(store) {
            store.initProfile();
        },
    }),
);
