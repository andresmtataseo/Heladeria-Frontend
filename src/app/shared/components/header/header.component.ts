import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Helados Don Alonso';
  subtitle = 'Deleite tu helado';

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;

  closeMenu(): void {
    // Remover el foco del dropdown para cerrarlo
    if (this.dropdownMenu) {
      this.dropdownMenu.nativeElement.blur();
    }
    // También remover el foco de cualquier elemento activo
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
