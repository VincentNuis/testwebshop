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
    new Item(2, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(3, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(4, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(5, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(6, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
    new Item(7, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(8, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(9, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(10, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(11, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(12, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
    new Item(13, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(14, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(15, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(16, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(17, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(18, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
    new Item(19, "MegaMan.EXE", "Navi", 40, "Rockman.png"),
  ]
    
}
