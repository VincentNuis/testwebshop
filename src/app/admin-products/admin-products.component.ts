import { Component, inject } from '@angular/core';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {

  productService = inject(ItemService);

  items = this.productService.getItems;

  
  addMockProduct() {
    this.productService.addItem({
      name: 'Nieuw Product',
      category: 'Nieuw',
      price: 25,
      image: 'new-product.jpg'
    });
  }

  remove(id: number) {
    this.productService.deleteItem(id);
  }
}
