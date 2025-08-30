import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoCreateDto, ProductoUpdateDto } from '../../../../core/models';
import { ProductoService, NotificationService } from '../../../../core/services';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductFormComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionProductosComponent implements OnInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';
  filterCategory: string = 'all';
  showForm: boolean = false;
  editingProduct?: Producto;
  isLoading: boolean = false;

  constructor(
    private productoService: ProductoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProductos = this.productos.filter(producto => {
      const matchesSearch = producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (producto.descripcion && producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesStatus = this.filterStatus === 'all' || 
                           (this.filterStatus === 'active' && producto.activo) ||
                           (this.filterStatus === 'inactive' && !producto.activo);
      
      const matchesCategory = this.filterCategory === 'all' || 
                             (producto.categoria && producto.categoria.id.toString() === this.filterCategory);
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  showCreateForm(): void {
    this.editingProduct = undefined;
    this.showForm = true;
  }

  onEditProduct(producto: Producto): void {
    this.editingProduct = producto;
    this.showForm = true;
  }



  handleFormSubmit(formData: ProductoCreateDto | ProductoUpdateDto): void {
    this.isLoading = true;
    
    if (this.editingProduct) {
      // Actualizar producto existente
      this.productoService.updateProducto(this.editingProduct.id, formData as ProductoUpdateDto).subscribe({
        next: () => {
          this.notificationService.success('Éxito', 'Producto actualizado correctamente');
          this.showForm = false;
          this.editingProduct = undefined;
          this.loadProductos();
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      // Crear nuevo producto
      this.productoService.createProducto(formData as ProductoCreateDto).subscribe({
        next: () => {
          this.notificationService.success('Éxito', 'Producto creado correctamente');
          this.showForm = false;
          this.loadProductos();
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  handleFormCancel(): void {
    this.showForm = false;
    this.editingProduct = undefined;
  }

  getUniqueCategories(): any[] {
    const categories = this.productos
      .filter(p => p.categoria)
      .map(p => p.categoria!)
      .filter((category, index, self) => 
        index === self.findIndex(c => c.id === category.id)
      );
    return categories;
  }

  trackByProductId(index: number, producto: Producto): number {
    return producto.id;
  }
}