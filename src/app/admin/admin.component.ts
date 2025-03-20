import { Component, inject } from '@angular/core';
import { AddItemComponent } from "../add-item/add-item.component";
import { ItemService } from '../services/item.service';
import { NewItem } from '../models/item';

@Component({
  selector: 'app-admin',
  imports: [AddItemComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isAddingItem = false;
  itemService = inject(ItemService);


  onStartAddItem(){
    this.isAddingItem = true;
  }

  onCancelAddItem(){
    this.isAddingItem = false;
  }

  onAddItem(newItem: NewItem){
    this.itemService.addItem(newItem);
    console.log(this.itemService.getItems());
  }
}
