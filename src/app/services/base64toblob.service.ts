import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class Base64Service {
    private imageObjectURL: string | null = null;

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

  getImagePath(base64Image: string, mimeType: string): string {
    // Zorg ervoor dat de oude Object URL wordt vrijgegeven voordat een nieuwe wordt aangemaakt
    if (this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL);
    }

    const blob = this.base64ToBlob(base64Image, mimeType);
    this.imageObjectURL = URL.createObjectURL(blob); // Genereer een URL van de Blob
    return this.imageObjectURL;
  }

  revokeImagePath(): void {
    if (this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL); // Vrijgeven van de Object URL
      this.imageObjectURL = null;
    }
  }
}