import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() config: any;
  model: any = {};

  getFieldName(field: any): string {
    return field?.name ?? field?.key ?? '';
  }

  search() {
    console.log('[DynamicForm] search', this.model);
  }
}
