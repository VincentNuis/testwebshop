import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class CategoryService {
    private currentCategorySignal = signal("New");
    private categories: string[] = ["New", "PET", "Battle Chips", "Navi"];

    readonly currentCategory = this.currentCategorySignal.asReadonly();

    constructor(){}
    
    changeCategory(category: string){
        this.currentCategorySignal.set(category);
    }

    getCategories(){
        return this.categories;
    }
}