import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent {
  @Input() isChild = false;
  @Input() childOf: any;
  @Output() item = new EventEmitter();

  constructor(private service: DatabaseService) {}

  addData(data: string) {
    const item: IItem = {
      data,
      children: [],
      isChild: this.isChild,
      childOf: this.childOf
    };
    this.service.addData(item).subscribe((response) => {
      this.item.emit(response);
    });
  }
}
