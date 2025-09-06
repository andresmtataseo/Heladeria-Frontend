import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-floating-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-whatsapp-button.component.html',
  styleUrl: './floating-whatsapp-button.component.css'
})
export class FloatingWhatsappButtonComponent {
  readonly whatsappNumber = environment.whatsapp.number;
  readonly message = '¡Hola! Me gustaría hacer un pedido de helados.';
  
  openWhatsApp(): void {
    const encodedMessage = encodeURIComponent(this.message);
    const whatsappUrl = `${environment.whatsapp.baseUrl}/${this.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
