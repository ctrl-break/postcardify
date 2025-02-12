import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryListComponent } from '@/widgets/category-list';
import { LayoutComponent } from '../layout';

@Component({
    selector: 'app-categories',
    imports: [LayoutComponent, CategoryListComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {}
