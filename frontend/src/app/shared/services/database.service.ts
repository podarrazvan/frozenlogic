import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpClient) {}

  addData(data: IItem) {
    return this.http.post(`${environment.api}/items`, data);
  }

  editChildren(children: IItem[], _id: any) {
    const data = {
      children,
      _id,
    };
    return this.http.put(`${environment.api}/items/children`, data);
  }

  getFirstData() {
    return this.http.get<IItem[]>(`${environment.api}/items`);
  }

  getChildren(_id: string|undefined) {
    return this.http.get<IItem[]>(`${environment.api}/items/children/${_id}`);
  }

  editItem(_id: any, data: string) {
    const send = {
      _id,
      data,
    };
    return this.http.put(`${environment.api}/items/update`, send);
  }

  deleteItem(_id: any) {
    return this.http.delete(`${environment.api}/items/${_id}`);
  }

  deleteChild(_id: any, children: any) {
    const data = {
      _id,
      children,
    };
    return this.http.put(`${environment.api}/items/remove-child`, data);
  }
}
