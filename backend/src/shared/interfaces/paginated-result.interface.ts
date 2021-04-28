import { Item } from "src/items/items.model";

export interface IPaginatedResult {
  results?: Item[];
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
}
