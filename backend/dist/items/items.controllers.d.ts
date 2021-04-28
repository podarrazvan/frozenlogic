import { Item } from './items.model';
import { ItemsService } from './items.service';
export declare class ItemsController {
    private itemsService;
    constructor(itemsService: ItemsService);
    addtem(item: Item): Promise<any>;
    updateChildren(children: string[], id: string): Promise<any>;
    removeChild(child: string[], id: string): Promise<void>;
    updateData(data: string[], id: string): Promise<any>;
    getChildren(id: string): Promise<any[]>;
    getItems(page: string, limit: string): Promise<import("../shared/interfaces/paginated-result.interface").IPaginatedResult | {
        message: any;
    }>;
    deleteItem(id: string): Promise<any>;
}
