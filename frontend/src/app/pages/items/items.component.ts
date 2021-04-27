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
    this.service.getFirstData().subscribe((items: IItem[]) => {
      console.log(items);
      this.items = items;
    });
    // this.sharedDataService.deletedItem$.subscribe((item) => {
    //   if(item != null) {
    //     this.findItem(item._id);
    //   }
    // });
  }

  newItem(item: any): void {
    this.items.push(item);
  }

  findItem(id: any): void {
    // ..
  }
}
