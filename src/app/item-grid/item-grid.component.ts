import { Component, inject } from '@angular/core';
import { ItemComponent } from "../item/item.component";
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-grid',
  imports: [ItemComponent],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss'
})
export class ItemGridComponent {
  categoryService = inject(CategoryService);
  itemService = inject(ItemService);
  itemList = this.itemService.itemsDB;
  ngOnInit(){
    this.itemService.getAllItems();
  }
    
}
