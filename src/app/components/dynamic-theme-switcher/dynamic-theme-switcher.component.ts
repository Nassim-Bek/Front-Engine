import { Component } from '@angular/core';
import { ThemeLoader } from '../../config/theme-loader';

@Component({
	selector: 'app-dynamic-theme-switcher',
	standalone: true,
	templateUrl: './dynamic-theme-switcher.component.html',
	styleUrls: ['./dynamic-theme-switcher.component.scss']
})
export class DynamicThemeSwitcherComponent {
	current = 'light';

	setTheme(t: 'light' | 'dark') {
		this.current = t;
		ThemeLoader.applyTheme(t);
	}
}
