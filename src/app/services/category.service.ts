import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private currentCategorySignal = signal("New");
  private categories: string[] = ["New", "PET", "Battle Chips", "Navi"];

  readonly currentCategory = this.currentCategorySignal.asReadonly();

  changeCategory(category: string): void {
    this.currentCategorySignal.set(category);
  }

  addCategory(newCategory: string): void {
    this.categories.push(newCategory);
  }

  getCategories(): string[] {
    return this.categories;
  }
}