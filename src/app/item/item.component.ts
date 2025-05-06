import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CurrencyPipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  cartService = inject(CartService);
  @Input({ required: true }) item!: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  }

  // Variabele om de gegenereerde Object URL op te slaan
  private imageObjectURL: string | null = null;

  // Functie om Base64 naar Blob om te zetten
  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64); // decodeer Base64 naar bytes
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: mimeType });
  }

  // Verkrijg de URL voor de afbeelding
  get imagePath() {
    const mimeType = 'image/jpeg'; // Zorg ervoor dat dit correct is voor de afbeelding
    if (this.item.image) {
      // Zorg ervoor dat de oude Object URL wordt vrijgegeven voordat een nieuwe wordt aangemaakt
      if (this.imageObjectURL) {
        URL.revokeObjectURL(this.imageObjectURL);
      }

      const blob = this.base64ToBlob(this.item.image, mimeType);
      this.imageObjectURL = URL.createObjectURL(blob); // Genereer een URL van de Blob
      return this.imageObjectURL;
    }
    return '';  // Lege string als er geen afbeelding is
  }

  // Bij het veranderen van de @Input() item, moet de imageURL opnieuw worden gegenereerd
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL); // Revoke the previous URL when the item changes
      this.imageObjectURL = null; // Reset the imageObjectURL to be recreated
    }
  }

  // Opruimen van Object URL bij vernietigen van het component
  ngOnDestroy(): void {
    if (this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL); // Vrijgeven van de Object URL
    }
  }

  onBuy() {
    this.cartService.addToCart(this.item);
  }
}
