import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeLoader } from '../../config/theme-loader'; // charge le thème actif

@Component({
  selector: 'app-dynamic-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dynamic-navbar.component.html',
  styleUrls: ['./dynamic-navbar.component.scss']
})
export class DynamicNavbarComponent {
  @Input() menuConfig: any[] = [];

  theme = ThemeLoader.getTheme(); // récupère le thème actif

  ngOnInit(): void {
    this.menuConfig.forEach(item => {
      item.open = false;
    });
    // subscribe to future theme changes to update classes reactively
    try {
      ThemeLoader.onChange((t: any) => { this.theme = t; });
    } catch (e) {}
  }


  toggleSubmenu(item: any): void {
    item.open = !item.open;
  }

  getNavbarClass(): string {
    return this.theme.navbar.backgroundClass;
  }

  getSubmenuClass(): string {
    return this.theme.navbar.submenuClass;
  }
}