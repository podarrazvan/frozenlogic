import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() hasNext = false;
  @Input() page = 1;
  @Output() newPage = new EventEmitter<number>();

  nextPage(): void {
    this.page++;
    this.newPage.emit(this.page);
  }

  previousPage(): void {
    this.page--;
    this.newPage.emit(this.page);
  }
}
