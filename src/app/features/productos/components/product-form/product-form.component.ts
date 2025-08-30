import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoCreateDto, ProductoUpdateDto, Categoria } from '../../../../core/models';
import { CategoriaService } from '../../../../core/services';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() producto?: Producto;
  @Input() isEdit: boolean = false;
  @Output() onSubmit = new EventEmitter<ProductoCreateDto | ProductoUpdateDto>();
  @Output() onCancel = new EventEmitter<void>();

  formData: ProductoCreateDto = {
    nombre: '',
    sabor: '',
    descripcion: '',
    precio: 0,
    precioMayorista: 0,
    cantidadMinimaMayorista: 0,
    stock: 0,
    categoriaId: 0,
    activo: true,
    imageUrl: ''
  };

  categorias: Categoria[] = [];
  isLoadingCategorias = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.formData = {
        nombre: this.producto.nombre,
        sabor: this.producto.sabor,
        descripcion: this.producto.descripcion || '',
        precio: this.producto.precio,
        precioMayorista: this.producto.precioMayorista || 0,
        cantidadMinimaMayorista: this.producto.cantidadMinimaMayorista || 0,
        stock: this.producto.stock,
        categoriaId: this.producto.categoria?.id || 0,
        activo: this.producto.activo,
        imageUrl: this.producto.imageUrl || ''
      };
    } else if (changes['producto'] && !this.producto) {
      this.resetForm();
    }
  }

  loadCategorias(): void {
    this.isLoadingCategorias = true;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias.filter(cat => cat.activo);
        this.isLoadingCategorias = false;
      },
      error: () => {
        this.isLoadingCategorias = false;
      }
    });
  }

  submitForm(): void {
    if (this.validateForm()) {
      if (this.isEdit && this.producto) {
        const updateData: ProductoUpdateDto = { ...this.formData };
        this.onSubmit.emit(updateData);
      } else {
        this.onSubmit.emit(this.formData);
      }
    }
  }

  validateForm(): boolean {
    // Validar que el precio mayorista sea menor o igual al precio regular
    if (this.formData.precioMayorista && this.formData.precioMayorista > this.formData.precio) {
      return false;
    }

    // Validar que si hay precio mayorista, debe haber cantidad mínima
    if (this.formData.precioMayorista && this.formData.precioMayorista > 0 &&
        (!this.formData.cantidadMinimaMayorista || this.formData.cantidadMinimaMayorista <= 0)) {
      return false;
    }

    return true;
  }

  isPrecioMayoristaValid(): boolean {
    return !this.formData.precioMayorista || this.formData.precioMayorista <= this.formData.precio;
  }

  isCantidadMinimaValid(): boolean {
    if (!this.formData.precioMayorista || this.formData.precioMayorista <= 0) {
      return true; // No se requiere cantidad mínima si no hay precio mayorista
    }
    return this.formData.cantidadMinimaMayorista !== undefined && this.formData.cantidadMinimaMayorista > 0;
  }

  cancelForm(): void {
    this.resetForm();
    this.onCancel.emit();
  }

  private resetForm(): void {
    this.formData = {
      nombre: '',
      sabor: '',
      descripcion: '',
      precio: 0,
      precioMayorista: 0,
      cantidadMinimaMayorista: 0,
      stock: 0,
      categoriaId: 0,
      activo: true,
      imageUrl: ''
    };
  }
}
