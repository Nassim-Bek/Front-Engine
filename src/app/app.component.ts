import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiConfigService } from './services/ui-config.service';
import { DynamicRendererComponent } from './dynamic-renderer/dynamic-renderer.component';
import { DynamicThemeSwitcherComponent } from './components/dynamic-theme-switcher/dynamic-theme-switcher.component';
import { ThemeLoader } from './config/theme-loader';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicRendererComponent, DynamicThemeSwitcherComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  uiConfig: any;
  logoSrc = '/assets/images/light_logo.png';
  loading = true;
  loadError: string | null = null;

  constructor(private route: ActivatedRoute, private uiConfigService: UiConfigService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const configKey = this.route.snapshot.data['config'] ?? null;
    // Fallback: infer from URL path if route data is not provided
    let key = configKey;
    if (!key && typeof window !== 'undefined') {
      const p = window.location.pathname || '';
      if (p.includes('/clients')) key = 'clients';
      else if (p.includes('/dictionnaire')) key = 'dictionnaire';
      else key = 'dictionnaire';
    }

    try {
      if (key === 'dictionnaire') {
        // prefer loading from source `src/app/pages` during development via dynamic import
        try {
          this.uiConfig = await this.uiConfigService.loadConfig('../pages/ui-config-dictionnaireDesAttributs.json');
        } catch (e) {
          // fallback to served assets
          this.uiConfig = await this.uiConfigService.loadConfig('/assets/pages/ui-config-dictionnaireDesAttributs.json');
        }
        console.log('[AppComponent] loaded uiConfig for dictionnaire:', this.uiConfig ? 'OK' : 'NULL');
      } else if (key === 'clients') {
        try {
          try {
            this.uiConfig = await this.uiConfigService.loadConfig('../pages/ui-config-clients.json');
          } catch (e) {
            this.uiConfig = await this.uiConfigService.loadConfig('/assets/pages/ui-config-clients.json');
          }
          console.log('[AppComponent] loaded uiConfig for clients:', this.uiConfig ? 'OK' : 'NULL');
        } catch (e) {
          this.uiConfig = null;
          this.loadError = 'Clients config not found';
        }
      }
    } catch (e) {
      this.uiConfig = null;
      this.loadError = 'Failed to load configuration';
    } finally {
      this.loading = false;
    }

    // Theme / logo wiring
    try {
      this.logoSrc = ThemeLoader.getThemeName() === 'dark' ? '/assets/images/dark_logo.PNG' : '/assets/images/light_logo.png';
      ThemeLoader.onChange(() => {
        this.logoSrc = ThemeLoader.getThemeName() === 'dark' ? '/assets/images/dark_logo.PNG' : '/assets/images/light_logo.png';
        try { this.cdr.detectChanges(); } catch {}
      });
    } catch (e) {}
  }
}