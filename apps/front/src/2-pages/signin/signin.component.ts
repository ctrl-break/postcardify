import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SigninFormComponent } from '@/widgets/signin-form';

@Component({
    selector: 'app-signin',
    imports: [CommonModule, SigninFormComponent],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {}
