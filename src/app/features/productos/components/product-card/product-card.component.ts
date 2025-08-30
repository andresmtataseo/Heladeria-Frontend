import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../core/models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input() producto!: Producto;
  @Output() onEdit = new EventEmitter<Producto>();

  imageUrl: string = '';
  showImage: boolean = false;
  private defaultImageUrl = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp';

  ngOnInit(): void {
    this.setImageUrl();
  }

  ngOnChanges(): void {
    this.setImageUrl();
  }

  private setImageUrl(): void {
    this.imageUrl = this.producto.imageUrl || this.defaultImageUrl;
    this.showImage = true;
  }

  onImageError(): void {
    if (this.imageUrl !== this.defaultImageUrl) {
      // Si falla la imagen del producto, intentar con la imagen por defecto
      this.imageUrl = this.defaultImageUrl;
    } else {
      // Si también falla la imagen por defecto, mostrar placeholder
      this.showImage = false;
    }
  }

  onImageLoad(): void {
    this.showImage = true;
  }

  editProduct(): void {
    this.onEdit.emit(this.producto);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }
}