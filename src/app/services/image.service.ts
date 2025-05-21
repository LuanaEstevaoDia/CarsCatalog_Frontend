import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagePath = 'assets/images/';

  getImage(fileName: string): string {
    return `${this.imagePath}${fileName}`;
  }
}