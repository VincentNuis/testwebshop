import { Component, inject } from '@angular/core';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from "../add-item/add-item.component";

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, AddItemComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {

  isAddingItem = false;

  productService = inject(ItemService);

  items = this.productService.getItems;

  
  addProduct() {
    this.isAddingItem = true;
  }

  remove(id: number) {
    this.productService.deleteItem(id);
  }

}
