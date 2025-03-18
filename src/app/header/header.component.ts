import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  counter = signal(0);
  
  addToCart(){
    this.counter.set(this.counter() + 1);
  }
}
