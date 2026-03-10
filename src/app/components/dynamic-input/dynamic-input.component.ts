import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  template: `<input [type]="type || 'text'" [value]="value" />`,
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {
  @Input() type?: string;
  @Input() value?: any;
}
