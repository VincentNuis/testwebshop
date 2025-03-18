import { Component, Inject, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input({ required:true }) item!: {
    name: string;
    category: string;
    price: number;
    image: string;
  }

  get imagePath(){
    return 'assets/' + this.item.image;
  }
}
