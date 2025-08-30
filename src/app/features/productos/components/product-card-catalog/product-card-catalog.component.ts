import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../core/models';

@Component({
  selector: 'app-product-card-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-catalog.component.html',
  styleUrl: './product-card-catalog.component.css'
})
export class ProductCardCatalogComponent implements OnInit, OnChanges {
  @Input() producto!: Producto;

  imageUrl: string = '';
  showImage: boolean = false;

  ngOnInit(): void {
    this.setImageUrl();
  }

  ngOnChanges(): void {
    this.setImageUrl();
  }

  private setImageUrl(): void {
    if (this.producto.imageUrl) {
      this.imageUrl = this.producto.imageUrl;
      this.showImage = true;
    } else {
      this.showImage = false;
    }
  }

  onImageError(): void {
    // Si falla la imagen del producto, mostrar placeholder
    this.showImage = false;
  }

  onImageLoad(): void {
    this.showImage = true;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }

  hasMayoristaPrice(): boolean {
    return !!(this.producto.precioMayorista && this.producto.precioMayorista > 0);
  }

  getSavingsPercentage(): number {
    if (!this.hasMayoristaPrice()) return 0;
    const savings = this.producto.precio - this.producto.precioMayorista!;
    return Math.round((savings / this.producto.precio) * 100);
  }
}