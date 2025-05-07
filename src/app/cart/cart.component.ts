import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItem } from '../interface/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartService = inject(CartService);

  cart = this.cartService.cartItems;
  qtyArr = [1, 2, 3, 4, 5, 6, 7, 8];

  onQuantitySelected(cartItem: CartItem, quantity: number): void {
    this.cartService.updateInCart(cartItem, quantity);
  }

  placeOrder(): void {
    const order = this.cartService.createOrder(); // Maak de bestelling lokaal
    this.cartService.createOrderBackend(order).subscribe({
      next: (response) => {
        console.log('Order saved to backend:', response);
        alert('Order placed successfully!');
      },
      error: (err) => {
        console.error('Error saving order:', err);
        alert('Failed to place order. Please try again.');
      }
    });
  }

  onRemove(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  get totalPrice(): number {
    return this.cart().reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  }
}
