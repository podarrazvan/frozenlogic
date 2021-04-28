import { Item } from './items.model';
import { Model } from 'mongoose';
import { IPaginatedResult } from 'src/shared/interfaces/paginated-result.interface';
export declare class ItemsService {
    private itemModel;
    constructor(itemModel: Model<any>);
    insertItem(item: Item): Promise<any>;
    updateChildren(_id: string, children: string[]): Promise<any>;
    removeChild(_id: any, child: any): Promise<void>;
    editItem(_id: any, data: any): Promise<any>;
    getFirstItems(page: any, limit: any): Promise<IPaginatedResult | {
        message: any;
    }>;
    getChildren(_id: string): Promise<any[]>;
    deleteItem(_id: any): Promise<any>;
}
