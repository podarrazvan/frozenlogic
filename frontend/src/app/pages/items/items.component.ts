import { Component } from '@angular/core';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { IPaginatedResult } from 'src/app/shared/interfaces/paginated-result.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items: IItem[] = [];
  page = 1;
  limit = 5;
  hasNext = true;

  constructor(
    private service: DatabaseService,
  ) {
    this.getItems();
  }

  getItems(): void {
    this.service
      .getFirstData(this.page, this.limit)
      .subscribe((response: IPaginatedResult) => {
        this.items = response.results;
        if (response.next) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      });
  }

  newItem(item: any): void {
    if (this.items === null) {
      this.items = [];
    }
    this.items.push(item);
  }

  nextPage(): void {
    this.page++;
    this.getItems();
  }

  previousPage(): void {
    this.page--;
    this.getItems();
  }
}
