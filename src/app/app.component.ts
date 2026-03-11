import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiConfigService } from './services/ui-config.service';
import { DynamicRendererComponent } from './dynamic-renderer/dynamic-renderer.component';
import { DynamicThemeSwitcherComponent } from './components/dynamic-theme-switcher/dynamic-theme-switcher.component';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicRendererComponent, DynamicThemeSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  uiConfig: any;
  loading = true;
  loadError: string | null = null;

  constructor(private route: ActivatedRoute, private uiConfigService: UiConfigService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const configKey = this.route.snapshot.data['config'] ?? null;
    let key = configKey;
    if (!key && typeof window !== 'undefined') {
      const p = window.location.pathname || '';
      if (p.includes('/clients')) key = 'clients';
      else if (p.includes('/dictionnaire')) key = 'dictionnaire';
      else key = 'dictionnaire';
    }

    try {
      this.uiConfig = await this.uiConfigService.loadConfig(key);
    } catch (e) {
      this.uiConfig = null;
      this.loadError = `Failed to load configuration: ${key}`;
    } finally {
      this.loading = false;
      try { this.cdr.detectChanges(); } catch {}
    }
  }
}