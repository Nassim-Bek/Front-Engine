import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="filter-form">
      <div *ngIf="config?.fields?.length" class="fields">
        <div class="field" *ngFor="let f of config.fields">
          <label>{{ f.label }}:</label>
          <ng-container [ngSwitch]="f.type">
            <input *ngSwitchCase="'text'" [(ngModel)]="model[f.name]" name="{{f.name}}" />
            <select *ngSwitchCase="'select'" [(ngModel)]="model[f.name]" name="{{f.name}}">
              <option *ngFor="let opt of f.options" [value]="opt.value">{{ opt.label }}</option>
            </select>
            <input *ngSwitchDefault [(ngModel)]="model[f.name]" name="{{f.name}}" />
          </ng-container>
        </div>
      </div>
      <div class="actions">
        <button type="button" (click)="search()">Rechercher</button>
      </div>
    </form>
  `
})
export class DynamicFormComponent {
  @Input() config: any;
  model: any = {};

  search() {
    // emit or perform search - for now just log
    console.log('[DynamicForm] search', this.model);
  }
}
