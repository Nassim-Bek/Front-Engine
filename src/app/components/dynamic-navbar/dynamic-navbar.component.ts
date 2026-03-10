import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeLoader } from '../../config/theme-loader';

@Component({
  selector: 'app-dynamic-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dynamic-navbar.component.html',
  styleUrls: ['./dynamic-navbar.component.scss']
})
export class DynamicNavbarComponent {
  @Input() menuConfig: any[] = [];

  theme = ThemeLoader.getTheme();

  ngOnInit(): void {
    try {
      ThemeLoader.onChange((t: any) => {
        this.theme = t;
      });
    } catch (e) {}
  }

  getNavbarClass(): string {
    return this.theme.navbar.backgroundClass;
  }

  getSubmenuClass(): string {
    return this.theme.navbar.submenuClass;
  }
}