export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  fechaCreacion: Date;
}

export interface CategoriaCreateDto {
  nombre: string;
  descripcion?: string;
  activo?: boolean;
}

export interface CategoriaUpdateDto {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}