import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TikTokVideo {
  id: string;
  url: string;
  videoId: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  tiktokVideos: TikTokVideo[] = [
    {
      id: '1',
      url: 'https://www.tiktok.com/@heladosdonalonsomcbo/video/7411741921351142662',
      videoId: '7411741921351142662'
    },
    {
      id: '2',
      url: 'https://www.tiktok.com/@heladosdonalonsomcbo/video/7418753532960165126',
      videoId: '7418753532960165126'
    },
    {
      id: '3',
      url: 'https://www.tiktok.com/@heladosdonalonsomcbo/video/7420595203527937286',
      videoId: '7420595203527937286'
    }
  ];

  videosToShow: number = 3;


  getVideosForDisplay(): TikTokVideo[] {
    return this.tiktokVideos.slice(0, this.videosToShow);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateVideosToShow();
  }

  private updateVideosToShow(): void {
    if (typeof window === 'undefined') {
      this.videosToShow = 3;
      return;
    }

    const width = window.innerWidth;

    if (width < 768) {
      this.videosToShow = 1;
    } else if (width < 1024) {
      this.videosToShow = 2;
    } else {
      this.videosToShow = 3;
    }
  }

  readonly sectionTitle = 'Síguenos en TikTok';
  readonly sectionDescription = 'Descubre nuestros deliciosos helados y momentos especiales en nuestros videos de TikTok';
  readonly profileUrl = 'https://www.tiktok.com/@heladosdonalonsomcbo';
  readonly ctaButtonText = 'Ver más en TikTok';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTikTokScript();
      this.updateVideosToShow();
    }
  }

  ngOnDestroy(): void {
  }


  private loadTikTokScript(): void {
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => {
      console.log('TikTok embed script cargado correctamente');
    };
    script.onerror = () => {
      console.error('Error cargando el script de TikTok embed');
    };

    document.head.appendChild(script);
  }
}
