import { Component, Input } from '@angular/core';
import { Categoria } from '../../../../core/models';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoria!: Categoria;
}