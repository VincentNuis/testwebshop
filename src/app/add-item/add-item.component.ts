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

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<{
    name: string;
    category: string;
    price: number;
    image: string;
  }>();

  categoryService = inject(CategoryService);
  categories = this.categoryService.getCategories();
  enteredName = "";
  enteredCategory = "";
  enteredPrice = 0.0;
  enteredImage = "";
  selectedImage: File | null = null;


  onSubmit(){
    if (!this.selectedImage) {
      alert("Selecteer een afbeelding!");
      return;
    }
  
    const item: NewItem = {
      name: this.enteredName,
      category: this.enteredCategory,
      price: this.enteredPrice
    };

    this.itemService.addItem(item, this.selectedImage!)
    .subscribe({
      next: () => console.log('Product succesvol toegevoegd'),
      error: err => console.error('Fout bij toevoegen:', err)
    });
    // this.add.emit({
    //   name: this.enteredName,
    //   category: this.enteredCategory,
    //   price: this.enteredPrice,
    //   image: this.enteredImage
    // })
  }

  onCancel(){
    this.cancel.emit();
  }

  
  imagePreview: string | null = null;

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.enteredImage = this.selectedImage.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; 
        
      };
      reader.readAsDataURL(this.selectedImage); 
    }
  }
}
