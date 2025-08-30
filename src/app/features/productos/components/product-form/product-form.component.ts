import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto, ProductoCreateDto, ProductoUpdateDto } from '../../../../core/models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Input() producto?: Producto;
  @Input() isEdit: boolean = false;
  @Output() onSubmit = new EventEmitter<ProductoCreateDto | ProductoUpdateDto>();
  @Output() onCancel = new EventEmitter<void>();
}