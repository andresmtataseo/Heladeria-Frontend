import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../../../core/models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoria!: Categoria;
  @Output() onEdit = new EventEmitter<Categoria>();
  
  isClosing: boolean = false;

  editCategory() {
    this.onEdit.emit(this.categoria);
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
