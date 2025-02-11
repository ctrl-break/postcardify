import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryDto } from '@/shared/api/generated';

@Component({
    selector: 'app-category',
    imports: [CommonModule, RouterLink],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
    @Input() category!: CategoryDto | null;
}
