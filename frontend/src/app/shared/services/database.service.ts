import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item.interface';
import { IPaginatedResult } from '../interfaces/paginated-result.interface';

const urlItems = `${environment.api}/items`;
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpClient) {}

  addData(data: IItem): any {
    return this.http.post(urlItems, data);
  }

  editChildren(children: IItem[], id: any): any {
    const data = {
      children,
      _id: id,
    };
    return this.http.put(`${urlItems}/children`, data);
  }

  getFirstData(page: number, limit: number): any {
    return this.http.get<IPaginatedResult>(`${urlItems}/${page}/${limit}`);
  }

  getChildren(id: any): any {
    return this.http.get<IItem[]>(`${urlItems}/children/${id}`);
  }

  editItem(id: any, data: string): any {
    const send = {
      _id: id,
      data,
    };
    return this.http.put(`${urlItems}/update`, send);
  }

  deleteItem(id: any): any {
    return this.http.delete(`${urlItems}/${id}`);
  }

  deleteChild(id: any, children: any): any {
    const data = {
      _id: id,
      children,
    };
    return this.http.put(`${urlItems}/remove-child`, data);
  }
}
