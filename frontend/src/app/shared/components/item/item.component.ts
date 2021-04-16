import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item!: IItem;
  @Output() deleted = new EventEmitter<IItem>();
  addNewChildren = false;
  editItemMode = false;
  constructor(private service: DatabaseService) {
  }

  addChildren(childId: string) {
    this.addNewChildren = false;
    let newChildren = this.item.children;
    newChildren.push(childId);
    this.service.editChildren(newChildren, this.item._id).subscribe();
  }

  editItem(newData: any) {
    if(this.editItemMode) {
      this.service.editItem(this.item._id, newData).subscribe(()=> {
        this.editItemMode = false;
        this.item.data = newData;
      });
    } else {
      this.editItemMode = true;
    }
  }

  deleteItem() {
    if(this.item.isChild) {
      this.service.deleteChild(this.item.childOf, this.item._id).subscribe(()=> {
        this.service.deleteItem(this.item._id).subscribe(()=>{
          location.reload();
        });
      })
    }
    this.service.deleteItem(this.item._id).subscribe(()=>{
      location.reload();
    });
  }
}