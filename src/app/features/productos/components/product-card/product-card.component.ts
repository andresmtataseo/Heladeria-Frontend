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
  isClosing: boolean = false;

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
  
  // Método para aplicar animación de salida
  closeWithAnimation(callback?: () => void) {
    this.isClosing = true;
    setTimeout(() => {
      this.isClosing = false;
      if (callback) callback();
    }, 300);
  }
}