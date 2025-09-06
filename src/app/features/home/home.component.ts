import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

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

  tiktokVideos: TikTokVideo[] = environment.featuredVideos.map(video => ({
    id: video.id,
    url: video.url,
    videoId: video.url.split('/').pop() || ''
  }));

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
  readonly profileUrl = environment.socialMedia.tiktok;
  readonly ctaButtonText = 'Ver más en TikTok';
  readonly googleMapsUrl: SafeResourceUrl;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer
  ) {
    this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.external.googleMapsEmbed);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTikTokScript();
      this.updateVideosToShow();
    }
  }

  ngOnDestroy(): void {
  }


  private loadTikTokScript(): void {
    if (document.querySelector(`script[src="${environment.external.tiktokEmbedScript}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = environment.external.tiktokEmbedScript;
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
