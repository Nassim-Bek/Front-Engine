import { LightTheme } from './themes/light-theme.config';
import { DarkTheme } from './themes/dark-theme.config';

export class ThemeLoader {
  // Thème actif par défaut
  private static activeTheme: any = LightTheme;
  private static activeName: 'light' | 'dark' = 'light';
  private static listeners: Array<(theme: any) => void> = [];

  // Méthode pour changer de thème
  static setTheme(themeName: 'light' | 'dark'): void {
    if (themeName === 'light') {
      this.activeTheme = LightTheme;
      this.activeName = 'light';
    } else if (themeName === 'dark') {
      this.activeTheme = DarkTheme;
      this.activeName = 'dark';
    }
    // notify subscribers
    try { this.listeners.forEach((l) => l(this.activeTheme)); } catch (e) {}
  }

  // Apply theme to document body by adding a theme class (for global CSS rules)
  static applyTheme(themeName: 'light' | 'dark'): void {
    this.setTheme(themeName);
    try {
      if (typeof document !== 'undefined' && document?.body?.classList) {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${this.activeName}`);
      }
    } catch (e) {
      // ignore when running in non-DOM environments (SSR)
    }
  }

  static onChange(cb: (theme: any) => void): void {
    this.listeners.push(cb);
  }

  static getThemeName(): 'light' | 'dark' {
    return this.activeName;
  }

  // Récupérer le thème actif
  static getTheme(): any {
    return this.activeTheme;
  }
}