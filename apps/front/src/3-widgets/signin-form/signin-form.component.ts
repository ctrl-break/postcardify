import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@/shared/api/auth.service';
import { UserStore, VocabularyStore } from '@/shared/lib/stores';
import { MatForms } from '@/shared/ui/mat-forms';

@Component({
    selector: 'app-signin-form',
    imports: [MatForms],
    templateUrl: './signin-form.component.html',
    styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
    private userStore = inject(UserStore);
    private vocabularyStore = inject(VocabularyStore);

    signInForm = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    // constructor(private _snackBar: MatSnackBar) {}

    submitForm() {
        console.log(this.signInForm);
        if (this.signInForm.invalid) {
            return;
        }
        const { login, password } = this.signInForm.value;
        this.authService.signin(login!, password!).subscribe({
            next: (res) => {
                console.log(res);
                this.authService.setTokensCookie(res.accessToken);
                this.userStore.initProfile();
                this.vocabularyStore.initVocabulary();
                this.router.navigateByUrl('/cards');
            },
            error: (err) => {
                console.error(err);
                if (err.status === 401) {
                    this.snackBar.open('Invalid username or password', 'Ok', { duration: 5000 });
                }
                if (err.status === 400) {
                    this.snackBar.open('Invalid password', 'Ok', { duration: 5000 });
                }
            },
        });
    }
}
