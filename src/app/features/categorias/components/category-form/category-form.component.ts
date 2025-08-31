import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Categoria, CategoriaCreateDto, CategoriaUpdateDto } from '../../../../core/models';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  @Input() categoria?: Categoria;
  @Input() isEdit: boolean = false;
  @Output() onSubmit = new EventEmitter<CategoriaCreateDto | CategoriaUpdateDto>();
  @Output() onCancel = new EventEmitter<void>();

  formData: CategoriaCreateDto = {
    nombre: '',
    descripcion: '',
    activo: true
  };
  
  isClosing: boolean = false;

  ngOnInit() {
    if (this.categoria && this.isEdit) {
      this.formData = {
        nombre: this.categoria.nombre,
        descripcion: this.categoria.descripcion,
        activo: this.categoria.activo
      };
    }
  }

  submitForm() {
    if (this.isEdit && this.categoria) {
      const updateData: CategoriaUpdateDto = {
        ...this.formData
      };
      this.onSubmit.emit(updateData);
    } else {
      this.onSubmit.emit(this.formData);
    }
  }

  cancelForm() {
    this.closeWithAnimation(() => {
      this.onCancel.emit();
    });
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
