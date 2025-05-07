import { inject, Injectable, signal } from "@angular/core";
import { Item } from "../models/item";
import { CartItem } from "../interface/cart";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    }
  
    
  addToCart(item: Item): void {
    const existingItem = this.cartItems().find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
      this.updateInCart(existingItem, existingItem.quantity + 1);
    } else {
      this.cartItems.update(items => [...items, { item, quantity: 1 }]);
    }
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items =>
      items.filter(item => item.item.id !== cartItem.item.id)
    );
  }

  updateInCart(cartItem: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(cartItem);
    } else {
      this.cartItems.update(items =>
        items.map(item =>
          item.item.id === cartItem.item.id
            ? { item: cartItem.item, quantity }
            : item
        )
      );
    }
  }
  clearCart(): void {
    this.cartItems.set([]);
  }

  createOrder(): any {
    const order = {
      orderDate: new Date(),
      totalPrice: this.getTotalPrice(),
      items: this.cartItems().map(cartItem => ({
        productId: cartItem.item.id,
        productName: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity
      }))
    };


    // Simuleer een backend-aanroep
    console.log('Order created:', order);

    // Leeg de winkelmand na het plaatsen van de bestelling
    this.clearCart();

    return order;
  }

  createOrderBackend(order: any): Observable<any> {
    console.log(order);
    const headers = this.getAuthHeaders();
    return this.http.post('http://20.107.56.65:8080/api/orders', order, { headers });
  }

  getTotalPrice(): number {
    return this.cartItems().reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  }
}