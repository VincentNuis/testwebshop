import { Component, computed, inject, signal } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [LoginComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(CartService);
  isLoggingIn = false;
  onCancelLogin() {
    this.isLoggingIn = false;
  }
  onLogin() {
    this.isLoggingIn = true;
  }
  counter = computed(() => this.cartService.cartItems().reduce(
    (acc, item) => acc + item.quantity, 0
  ))

}
