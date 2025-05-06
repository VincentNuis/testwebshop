import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { NewItem } from '../interface/newItem';

@Component({
  selector: 'app-add-item',
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  categories = this.categoryService.getCategories();
  enteredName = '';
  enteredCategory = '';
  enteredPrice = 0.0;
  enteredImage = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  onSubmit(): void {
    if (!this.selectedImage) {
      alert('Please select an image!');
      return;
    }

    const item: NewItem = {
      name: this.enteredName,
      category: this.enteredCategory,
      price: this.enteredPrice
    };

    this.itemService.addItem(item, this.selectedImage).subscribe({
      next: () => {
        this.itemService.getAllItems();
        this.add.emit();
      },
      error: (err) => console.error('Error adding product:', err)
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      this.enteredImage = this.selectedImage.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
}
