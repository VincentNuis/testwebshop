import { Injectable, signal } from "@angular/core";
import { Item } from "../models/item";
import { CartItem } from "../interface/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  addToCart(item: Item): void {
    this.cartItems.update(items => [...items, { item, quantity: 1 }]);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items =>
      items.filter(item => item.item.id !== cartItem.item.id)
    );
  }

  updateInCart(cartItem: CartItem, quantity: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.item.id === cartItem.item.id
          ? { item: cartItem.item, quantity }
          : item
      )
    );
  }
}