import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpClient) {}

  addData(data: IItem): any {
    return this.http.post(`${environment.api}/items`, data);
  }

  editChildren(children: IItem[], id: any): any {
    const data = {
      children,
      _id: id,
    };
    return this.http.put(`${environment.api}/items/children`, data);
  }

  getFirstData(): any {
    return this.http.get<IItem[]>(`${environment.api}/items`);
  }

  getChildren(id: string | undefined): any {
    return this.http.get<IItem[]>(`${environment.api}/items/children/${id}`);
  }

  editItem(id: any, data: string): any {
    const send = {
      _id: id,
      data,
    };
    return this.http.put(`${environment.api}/items/update`, send);
  }

  deleteItem(id: any): any {
    return this.http.delete(`${environment.api}/items/${id}`);
  }

  deleteChild(id: any, children: any): any {
    const data = {
      _id: id,
      children,
    };
    return this.http.put(`${environment.api}/items/remove-child`, data);
  }
}
