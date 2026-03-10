import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select aria-label="dynamic dropdown" (change)="onChange($event)">
      <option [value]="''">--</option>
      <option *ngFor="let o of options" [value]="o.value">{{ o.label }}</option>
    </select>
  `,
  styleUrls: ['./dynamic-dropdown.component.scss']
})
export class DynamicDropdownComponent {
  @Input() options: Array<{ label: string; value: any }> = [];
  @Output() change = new EventEmitter<any>();

  onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.change.emit(value);
  }
}
