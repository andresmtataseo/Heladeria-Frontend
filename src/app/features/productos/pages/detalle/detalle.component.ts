import { Component, Input, Output, EventEmitter, OnInit, OnChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Producto } from '../../../../core/models/producto.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit, OnChanges {
  @Input() product: Producto | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  imageUrl: string = '';
  imageLoaded: boolean = false;
  imageError: boolean = false;
  isClosing: boolean = false;

  ngOnInit() {
    if (this.product) {
      this.setImageUrl();
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.setImageUrl();
      this.imageLoaded = false;
      this.imageError = false;
    }
  }

  // Configurar URL de imagen del producto
  setImageUrl() {
    if (this.product?.imageUrl) {
      this.imageUrl = this.product.imageUrl.startsWith('http') 
        ? this.product.imageUrl 
        : `/assets/images/productos/${this.product.imageUrl}`;
    } else {
      this.imageUrl = '';
    }
  }

  // Manejar carga exitosa de imagen
  onImageLoad() {
    this.imageLoaded = true;
    this.imageError = false;
  }

  // Manejar error de carga de imagen
  onImageError() {
    this.imageError = true;
    this.imageLoaded = false;
  }

  // Cerrar modal con animación de salida
  close() {
    this.isClosing = true;
    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      this.isClosing = false;
      this.closeModal.emit();
    }, 300); // 300ms coincide con la duración de la animación
  }

  // Cerrar modal al hacer clic en el overlay
  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  // Cerrar modal con tecla Escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isVisible) {
      this.close();
    }
  }

  // Formatear precio
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }

  // Verificar si tiene precio mayorista
  hasMayoristaPrice(): boolean {
    return this.product?.precioMayorista != null && 
           this.product.precioMayorista > 0 && 
           this.product.precioMayorista !== this.product.precio;
  }

  // Calcular porcentaje de ahorro
  getSavingsPercentage(): number {
    if (!this.product || !this.hasMayoristaPrice()) {
      return 0;
    }
    
    const retail = this.product.precio;
    const wholesale = this.product.precioMayorista!;
    return Math.round(((retail - wholesale) / retail) * 100);
  }

  // Obtener estado de disponibilidad
  getAvailabilityStatus(): string {
    return this.product?.activo ? 'Disponible' : 'No disponible';
  }

  // Obtener clase CSS para el estado
  getStatusClass(): string {
    return this.product?.activo ? 'text-success' : 'text-error';
  }
}