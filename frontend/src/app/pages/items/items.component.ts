import { Component } from '@angular/core';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items: IItem[] = [];

  constructor(
    private service: DatabaseService,
    private sharedDataService: SharedDataService
  ) {
    this.service.getFirstData().subscribe((items)=>{
      console.log(items);
      this.items = items;
    });
    // this.sharedDataService.deletedItem$.subscribe((item) => {
    //   if(item != null) {
    //     this.findItem(item._id);
    //   }
    // });
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

  findItem(_id: any) {
   //..
  }
}
