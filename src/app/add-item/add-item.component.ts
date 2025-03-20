import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewItem } from '../models/item';

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
  }>();

  enteredName = "";
  enteredCategory = "";
  enteredPrice = 0.0;

  onSubmit(){
    this.add.emit({
      name: this.enteredName,
      category: this.enteredCategory,
      price: this.enteredPrice
    })
  }

  onCancel(){
    this.cancel.emit();
  }
}
