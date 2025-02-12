import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-initial-loader',
    imports: [MatProgressSpinnerModule],
    templateUrl: './initial-loader.component.html',
    styleUrl: './initial-loader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialLoaderComponent {}
