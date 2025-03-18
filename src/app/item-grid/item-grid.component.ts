import { Component, inject, Inject, Injectable } from '@angular/core';
import { ItemComponent } from "../item/item.component";
import { Item } from '../models/item';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-item-grid',
  imports: [ItemComponent],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss'
})
export class ItemGridComponent {
  categoryService = inject(CategoryService);
  
  itemList: Item[] = 
  [new Item(1, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(2, "Advanced Pet 2", "PET", 50, "AdvancedPet.jpg"),
    new Item(3, "Advanced Pet 3", "PET", 50, "AdvancedPet.jpg"),
    new Item(4, "Advanced Pet 4", "PET", 50, "AdvancedPet.jpg"),
    new Item(5, "Advanced Pet 5", "PET", 50, "AdvancedPet.jpg"),
    new Item(6, "Advanced Pet 6", "PET", 50, "AdvancedPet.jpg")]
    
}
