import { Component, computed, inject } from '@angular/core';
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

  onCancelLogin(): void {
    this.isLoggingIn = false;
  }

  onLogin(): void {
    this.isLoggingIn = true;
  }

  counter = computed(() =>
    this.cartService.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
}
