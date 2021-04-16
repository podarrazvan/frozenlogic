import { Item } from "./items.model";
import { Model } from 'mongoose';
export declare class ItemsService {
    private itemModel;
    items: Item[];
    constructor(itemModel: Model<any>);
    insertItem(data: string, children: string[], isChild: boolean, childOf: string): Promise<any>;
    updateChildren(_id: string, children: string[]): Promise<any>;
    removeChild(_id: any, child: any): Promise<any>;
    editItem(_id: any, data: any): Promise<any>;
    getItems(): Promise<any[]>;
    deleteItem(_id: any): Promise<void>;
}
