import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-main',
    imports: [CommonModule, LayoutComponent, MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {}
