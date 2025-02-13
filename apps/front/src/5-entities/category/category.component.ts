import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryDto } from '@/shared/api/generated';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-category',
    imports: [CommonModule, RouterLink, MatListModule, MatIconModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
    @Input() set category(_category: CategoryDto) {
        this.categoryItem = _category;
        this.setDescription(this.categoryItem.description);
    }

    categoryItem: CategoryDto | undefined;
    title = '';
    description = '';

    setDescription(descr = '') {
        if (!descr) return;

        const splited = descr.split('.');
        this.title = splited[0];
        this.description = splited.slice(1).join('.');
    }
}
