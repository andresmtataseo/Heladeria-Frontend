import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface CompanyInfo {
  name: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly currentYear: number = new Date().getFullYear();

  readonly companyInfo: CompanyInfo = {
    name: 'Helados Don Alonso',
    description: 'Los mejores helados artesanales desde 2020',
    phone: '+58 424-6563703',
    email: 'heladosdonalonso@gmail.com'
  };

  readonly socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      url: environment.socialMedia.instagram,
      icon: 'instagram'
    },
    {
      name: 'TikTok',
      url: environment.socialMedia.tiktok,
      icon: 'tiktok'
    },
    {
      name: 'WhatsApp',
      url: environment.socialMedia.whatsapp,
      icon: 'whatsapp'
    }
  ];

  /**
   * Abre un enlace social en una nueva pestaña
   * @param url - URL del enlace social
   */
  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Obtiene el año actual para el copyright
   * @returns Año actual
   */
  getCurrentYear(): number {
    return this.currentYear;
  }
}
