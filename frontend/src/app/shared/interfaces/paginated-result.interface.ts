import { IItem } from './item.interface';

export interface IPaginatedResult {
  results: IItem[];
  previous: {
    page: number;
    limit: number;
  };
  next: {
    page: number;
    limit: number;
  };
}
