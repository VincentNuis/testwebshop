import { Component, inject } from '@angular/core';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from "../add-item/add-item.component";
import { Base64Service } from '../services/base64toblob.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, AddItemComponent, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
  isAddingItem = false;
  editingId: number | null = null;

  productService = inject(ItemService);
  base64Service = inject(Base64Service);

  items = this.productService.itemsDB;

  addProduct(): void {
    this.isAddingItem = true;
  }

  cancelAddProduct(): void {
    this.isAddingItem = false;
  }

  edit(id: number): void {
    this.editingId = id;
  }

  saveEdit(item: Item): void {
    this.productService.updateItem(item.id, item).subscribe({
      next: () => {
        this.productService.getAllItems();
        this.editingId = null;
      },
      error: (err) => console.error('Error updating product:', err)
    });
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  remove(id: number): void {
    this.productService.deleteItem(id).subscribe({
      next: () => {
        this.productService.getAllItems();
      },
      error: (err) => console.error('Error deleting product:', err)
    });
  }

  getImagePath(image: string): string {
    const mimeType = "image/jpg";
    return this.base64Service.getImagePath(image, mimeType);
  }
}
