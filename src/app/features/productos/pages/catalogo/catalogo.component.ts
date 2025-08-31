import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardCatalogComponent } from '../../components/product-card-catalog/product-card-catalog.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { DetalleComponent } from '../detalle/detalle.component';
import { ProductoService } from '../../../../core/services/producto.service';
import { Producto } from '../../../../core/models/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductCardCatalogComponent, LoadingSpinnerComponent, DetalleComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;
  error: string | null = null;
  
  // Modal state
  selectedProduct: Producto | null = null;
  isModalVisible = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.loading = true;
    this.error = null;

    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos.filter(p => p.activo);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  onRetry(): void {
    this.loadProductos();
  }

  // Abrir modal con producto seleccionado
  openProductModal(producto: Producto) {
    this.selectedProduct = producto;
    this.isModalVisible = true;
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal
  closeProductModal() {
    this.isModalVisible = false;
    this.selectedProduct = null;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  trackByProductId(index: number, producto: Producto): number {
    return producto.id;
  }
}
