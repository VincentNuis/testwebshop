import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewItem } from '../models/item';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-item',
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
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

  onSubmit(){
    this.add.emit({
      name: this.enteredName,
      category: this.enteredCategory,
      price: this.enteredPrice,
      image: this.enteredImage
    })
  }

  onCancel(){
    this.cancel.emit();
  }

  imagePreview: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.enteredImage = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; 
        
      };
      reader.readAsDataURL(file); 
    }
  }
}
