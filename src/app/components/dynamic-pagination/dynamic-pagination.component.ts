import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-dynamic-pagination',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dynamic-pagination.component.html',
	styleUrls: ['./dynamic-pagination.component.scss']
})
export class DynamicPaginationComponent {
	@Input() total = 0;
	@Input() page = 1;
	@Input() pageSize = 10;
	@Output() pageChange = new EventEmitter<number>();

	get totalPages(): number {
		return Math.max(1, Math.ceil(this.total / this.pageSize));
	}

	setPage(p: number) {
		if (p < 1) p = 1;
		if (p > this.totalPages) p = this.totalPages;
		if (p !== this.page) {
			this.page = p;
			this.pageChange.emit(this.page);
		}
	}
}
