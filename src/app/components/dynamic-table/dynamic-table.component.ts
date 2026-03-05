import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPaginationComponent } from '../dynamic-pagination/dynamic-pagination.component';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, DynamicPaginationComponent],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {
  @Input() title = '';
  @Input() headers: string[] = [];
  @Input() rows: any[][] = [];
  @Input() page = 1;
  @Input() pageSize = 10;
}
