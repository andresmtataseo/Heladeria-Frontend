import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria, CategoriaCreateDto, CategoriaUpdateDto } from '../../../../core/models/categoria.model';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CategoryCardComponent, CategoryFormComponent],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
  selectedCategory: Categoria | undefined = undefined;
  showForm = false;
  isEditMode = false;
  searchTerm = '';
  statusFilter = 'all';

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.loadCategorias();
  }

  get totalCategorias(): number {
    return this.categorias.length;
  }

  get categoriasActivas(): number {
    return this.categorias.filter(c => c.activo).length;
  }

  get categoriasInactivas(): number {
    return this.categorias.filter(c => !c.activo).length;
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.filterCategorias();
      },
      error: (error) => {
        // El error ya es manejado por el servicio
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  filterCategorias() {
    let filtered = [...this.categorias];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(categoria =>
        categoria.nombre.toLowerCase().includes(term) ||
        (categoria.descripcion && categoria.descripcion.toLowerCase().includes(term))
      );
    }

    // Filtrar por estado
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(categoria => categoria.activo);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(categoria => !categoria.activo);
    }

    this.filteredCategorias = filtered;
  }

  openCreateForm() {
    this.selectedCategory = undefined;
    this.isEditMode = false;
    this.showForm = true;
  }

  editCategory(categoria: Categoria) {
    this.selectedCategory = categoria;
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteCategory(categoriaId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(categoriaId).subscribe({
        next: () => {
          this.errorHandler.showSuccess(
            'Categoría Eliminada',
            'La categoría ha sido eliminada exitosamente'
          );
          this.loadCategorias();
        },
        error: (error) => {
          // El error ya es manejado por el servicio
          console.error('Error al eliminar categoría:', error);
        }
      });
    }
  }

  handleFormSubmit(formData: CategoriaCreateDto | CategoriaUpdateDto) {
    if (this.isEditMode && this.selectedCategory) {
      // Actualizar categoría existente
      const updateData = formData as CategoriaUpdateDto;
      this.categoriaService.updateCategoria(this.selectedCategory.id, updateData).subscribe({
        next: () => {
          this.errorHandler.showSuccess(
            'Categoría Actualizada',
            'La categoría ha sido actualizada exitosamente'
          );
          this.closeForm();
          this.loadCategorias();
        },
        error: (error) => {
          // El error ya es manejado por el servicio
          console.error('Error al actualizar categoría:', error);
        }
      });
    } else {
      // Crear nueva categoría
      this.categoriaService.createCategoria(formData as CategoriaCreateDto).subscribe({
        next: () => {
          this.errorHandler.showSuccess(
            'Categoría Creada',
            'La nueva categoría ha sido creada exitosamente'
          );
          this.closeForm();
          this.loadCategorias();
        },
        error: (error) => {
          // El error ya es manejado por el servicio
          console.error('Error al crear categoría:', error);
        }
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedCategory = undefined;
    this.isEditMode = false;
  }
}
