import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  standalone: true,
  template: `<button type="button">{{ label || 'Button' }}</button>`
})
export class DynamicButtonComponent {
  @Input() label?: string;
}
