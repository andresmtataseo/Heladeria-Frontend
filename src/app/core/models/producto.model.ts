import { Categoria } from './categoria.model';

export interface Producto {
  id: number;
  nombre: string;
  sabor: string;
  descripcion?: string;
  precio: number;
  precioMayorista?: number;
  cantidadMinimaMayorista: number;
  stock: number;
  categoriaId?: number;
  categoria?: Categoria;
  activo: boolean;
  imageUrl?: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface ProductoCreateDto {
  nombre: string;
  sabor: string;
  descripcion?: string;
  precio: number;
  precioMayorista?: number;
  cantidadMinimaMayorista?: number;
  stock?: number;
  categoriaId?: number;
  activo?: boolean;
  imageUrl?: string;
}

export interface ProductoUpdateDto {
  nombre?: string;
  sabor?: string;
  descripcion?: string;
  precio?: number;
  precioMayorista?: number;
  cantidadMinimaMayorista?: number;
  stock?: number;
  categoriaId?: number;
  activo?: boolean;
  imageUrl?: string;
}

// Validaciones para el modelo Producto
export class ProductoValidations {
  static validatePrecio(precio: number): boolean {
    return precio > 0;
  }

  static validatePrecioMayorista(precioMayorista: number, precio: number): boolean {
    return precioMayorista > 0 && precioMayorista <= precio;
  }

  static validateCantidadMinimaMayorista(cantidad: number): boolean {
    return cantidad > 0;
  }

  static validateStock(stock: number): boolean {
    return stock >= 0;
  }
}