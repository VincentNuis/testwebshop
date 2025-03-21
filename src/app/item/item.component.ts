import { Component, inject, Inject, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  cartService = inject(CartService);
  @Input({ required:true }) item!: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  }

  get imagePath(){
    return 'assets/' + this.item.image;
  }

  onBuy(){
    this.cartService.addToCart(this.item);
    console.log(this.item);
  }
}
