import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-datepicker',
  standalone: true,
  template: `<input type="date" [value]="value" />`
})
export class DynamicDatepickerComponent {
  @Input() value?: string;
}
