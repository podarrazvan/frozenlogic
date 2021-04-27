import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { DatabaseService } from '../../services/database.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IItem;
  @Output() deleted = new EventEmitter<IItem>();
  addNewChildren = false;
  editItemMode = false;
  showMoreItems = false;
  children: IItem[] = [];
  constructor(
    private service: DatabaseService,
    private sharedDataService: SharedDataService
  ) {}

  showMore(): void {
    this.showMoreItems = true;
    this.service.getChildren(this.item._id).subscribe((response: IItem[]) => {
      this.children = response;
    });
  }

  addChildren(childId: string): void {
    this.addNewChildren = false;
    const newChildren = this.item.children;
    newChildren.push(childId);
    this.service.editChildren(newChildren, this.item._id).subscribe();
  }

  editItem(newData: any): void {
    if (this.editItemMode) {
      this.service.editItem(this.item._id, newData).subscribe(() => {
        this.editItemMode = false;
        this.item.data = newData;
      });
    } else {
      this.editItemMode = true;
    }
  }

  deleteItem(): void {
    if (this.item.isChild) {
      this.service
        .deleteChild(this.item.childOf, this.item._id)
        .subscribe(() => {
          this.sharedDataService.setDeletedItem(this.item);
        });
    }
    this.service.deleteItem(this.item._id).subscribe(() => {
      this.sharedDataService.setDeletedItem(this.item);
    });
  }
}
