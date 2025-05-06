import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Base64Service } from '../services/base64toblob.service';

@Component({
  selector: 'app-item',
  imports: [CurrencyPipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  cartService = inject(CartService);
  base64Service = inject(Base64Service);

  @Input({ required: true }) item!: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  };

  private imageObjectURL: string | null = null;

  get imagePath(): string {
    const mimeType = 'image/jpg';
    if (this.item.image) {
      return this.base64Service.getImagePath(this.item.image, mimeType);
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.base64Service.revokeImagePath();
    }
  }

  ngOnDestroy(): void {
    if (this.imageObjectURL) {
      this.base64Service.revokeImagePath();
    }
  }

  onBuy(): void {
    this.cartService.addToCart(this.item);
  }
}
