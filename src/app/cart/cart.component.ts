import { Component, inject, Input, signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItem } from '../interface/cart';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);
  cartService = inject(CartService);

  cart = signal(this.cartService.cartItems());

  onQuantitySelected(item: CartItem, quantity: number): void {
    // Update the quantity in the item
    this.cartService.updateInCart(item, Number(quantity));
  }

  onRemove(item: CartItem){
    this.cartService.removeFromCart(item);
  }
}
