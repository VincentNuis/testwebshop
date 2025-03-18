import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  categoryService = inject(CategoryService);
  categories = this.categoryService.getCategories();

  changeCategory(category: string){
    this.categoryService.changeCategory(category);
  }
}