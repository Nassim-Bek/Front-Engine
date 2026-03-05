import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeLoader } from './app/config/theme-loader';

// Apply default theme as soon as DOM is available so initial render uses correct classes
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { ThemeLoader.applyTheme('light'); } catch (_) {}
    });
  } else {
    try { ThemeLoader.applyTheme('light'); } catch (_) {}
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
