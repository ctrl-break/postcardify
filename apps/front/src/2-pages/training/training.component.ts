import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-training',
    imports: [CommonModule, RouterLink, LayoutComponent, MatButtonModule],
    templateUrl: './training.component.html',
    styleUrl: './training.component.scss',
})
export class TrainingComponent {}
