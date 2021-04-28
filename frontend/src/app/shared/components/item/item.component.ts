import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: any;
  @Output() deleted = new EventEmitter<IItem>();
  addNewChildren = false;
  editItemMode = false;
  showMoreItems = false;
  children: IItem[] = [];
  newData = '';

  constructor(private service: DatabaseService) {}

  showMore(): void {
    if (!this.editItemMode) {
      this.showMoreItems = !this.showMoreItems;
      if (this.showMoreItems) {
        this.service.getChildren(this.item._id).subscribe(
          (response: IItem[]) => {
            this.children = response;
          },
          (error: any) => {
            alert(error.message);
          }
        );
      }
    }
  }

  addChildren(child: IItem): void {
    this.children.push(child);
    this.addNewChildren = false;
    const newChildren = this.item.children;
    newChildren.push(child._id);
    this.service.editChildren(this.item._id, newChildren).subscribe(
      () => {},
      (error: any) => {
        alert(error.message);
      }
    );
  }

  editItem(newData: any): void {
    if (this.editItemMode) {
      this.service.editItem(this.item._id, newData).subscribe(
        () => {
          this.editItemMode = false;
          this.item.data = newData;
        },
        (error: any) => {
          alert(error.message);
        }
      );
    } else {
      this.editItemMode = true;
    }
  }

  setNewChildrenMode(event: Event): void {
    event.stopPropagation();
    this.addNewChildren = true;
  }

  setEditItemMode(event: Event, mode: boolean): void {
    event.stopPropagation();
    this.newData = this.item.data;
    this.editItemMode = mode;
  }

  deleteItem(event: Event): void {
    event.stopPropagation();
    if (this.item.isChild) {
      this.service.deleteChild(this.item.childOf, this.item._id).subscribe(
        () => {
          this.item = null;
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
    this.service.deleteItem(this.item._id).subscribe(
      () => {
        this.item = null;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
}
