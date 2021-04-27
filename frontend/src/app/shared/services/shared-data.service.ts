import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IItem } from "../interfaces/item.interface";

@Injectable({providedIn: 'root'})
export class SharedDataService implements OnDestroy {
  private deletedItemSubject$ = new BehaviorSubject<IItem>(null!);
  public deletedItem$ = this.deletedItemSubject$.asObservable();

  setDeletedItem(item: IItem) {
    this.deletedItemSubject$.next(item);
  }

  ngOnDestroy() {
    //...
  }
}
