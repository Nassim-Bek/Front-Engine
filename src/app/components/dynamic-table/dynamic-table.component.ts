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
  @Input() actions: Array<{ key: string; label: string }> = [];
  @Input() page = 1;
  @Input() pageSize = 10;

  get pagedRows(): any[][] {
    const start = (this.page - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  isActionsColumn(h: string): boolean {
    return (h || '').toLowerCase().includes('action');
  }
}
