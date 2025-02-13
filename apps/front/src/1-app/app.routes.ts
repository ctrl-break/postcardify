import { Routes } from '@angular/router';
import { CardsComponent } from '@/pages/cards/cards.component';
import { CategoriesComponent } from '@/pages/categories/categories.component';
import { MainComponent } from '@/pages/main/main.component';
import { ProfileComponent } from '@/pages/profile/profile.component';
import { SettingsComponent } from '@/pages/settings/settings.component';
import { SigninComponent } from '@/pages/signin/signin.component';
import { WordComponent } from '@/pages/word/word.component';
import { WordsComponent } from '@/pages/words/words.component';
import { signinGuard, userGuard } from '@/shared/lib/guards';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [signinGuard],
    },
    {
        path: 'cards',
        component: CardsComponent,
        canActivate: [userGuard],
    },

    {
        path: 'words/:id/list/letter/:letter',
        pathMatch: 'full',
        component: WordsComponent,
    },
    {
        path: 'words/:id/list',
        pathMatch: 'full',
        component: WordsComponent,
    },

    {
        path: 'words/word/:id',
        pathMatch: 'full',
        component: WordComponent,
    },
    {
        path: 'words/vocabulary/:id',
        pathMatch: 'full',
        data: { type: 'vocabulary' },
        component: WordComponent,
        canActivate: [userGuard],
    },

    {
        path: 'words',
        component: CategoriesComponent,
    },

    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [userGuard],
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [userGuard],
    },
];
