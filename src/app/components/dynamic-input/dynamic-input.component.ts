import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  template: `<input [type]="type || 'text'" [value]="value" />`
})
export class DynamicInputComponent {
  @Input() type?: string;
  @Input() value?: any;
}
