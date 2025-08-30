import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categoria, CategoriaCreateDto, CategoriaUpdateDto } from '../../../../core/models';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Input() categoria?: Categoria;
  @Input() isEdit: boolean = false;
  @Output() onSubmit = new EventEmitter<CategoriaCreateDto | CategoriaUpdateDto>();
  @Output() onCancel = new EventEmitter<void>();
}