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


  addProduct() {
    this.isAddingItem = true;
  }

  cancelAddProduct() {
    this.isAddingItem = false; // Annuleer het toevoegen van een product
  }

  edit(id: number) {
    this.editingId = id; // Zet de ID van het item dat wordt bewerkt
  }

  saveEdit(item: Item) {
    console.log(item);
    this.productService.updateItem(item.id, item).subscribe({
      next: () => {
        console.log('Product succesvol bijgewerkt');
        this.productService.getAllItems(); // Update de lijst van items
        this.editingId = null;
      },
      error: err => console.error('Fout bij bijwerken:', err)
    });
    // Verlaat de bewerkmodus
  }

  cancelEdit() {
    this.editingId = null; // Annuleer de bewerkmodus
  }

  remove(id: number) {
    console.log('Verwijder product met ID:', id);
    this.productService.deleteItem(id).subscribe({
      next: () => {
        console.log('Product succesvol verwijderd');
        this.productService.getAllItems(); // Update de lijst van items
      },
      error: err => console.error('Fout bij verwijderen:', err)
    });
    this.productService.getAllItems(); // Update de lijst van items
  }

  getImagePath(image: string): string {
    const mimeType = "image/jpg";
    return this.base64Service.getImagePath(image, mimeType)
  }
}
