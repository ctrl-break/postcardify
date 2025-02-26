import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryComponent } from '@/entities/category';
import { CategoryService } from '@/shared/api/generated';

@Component({
    selector: 'app-category-list',
    imports: [CommonModule, CategoryComponent],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
    apiService = inject(CategoryService);

    categories$ = this.apiService.categoryControllerFindBasicCategories();
}
