import { Component } from '@angular/core';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items: IItem[] = [];

  constructor(private service: DatabaseService) {
    this.getData();
  }

  getData() {
    this.service.getData().subscribe((items) => {
      this.items = items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.children.length > 0) {
          for (let y = 0; y < item.children.length; y++) {
            const child = item.children[y];
            if (this.getChildren(child) != null) {
              item.children[y] = this.getChildren(child);
              this.items[i] = item;
            }
          }
        }
      }
    });
  }

  getChildren(id: string) {
    for (let i = 0; i < this.items.length; i++) {
      const child = this.items[i];
      if (child._id === id) {
        return child;
      }
    }
    return null;
  }

  newItem(item: any) {
    this.items.push(item);
  }
}
