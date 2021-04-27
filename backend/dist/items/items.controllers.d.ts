import { ItemsService } from './items.service';
export declare class ItemsController {
    private itemsService;
    constructor(itemsService: ItemsService);
    addtem(data: string, children: string[], isChild: boolean, childOf: string): Promise<any>;
    updateChildren(children: string[], _id: string): Promise<any>;
    removeChild(child: string[], _id: string): Promise<void>;
    updateData(data: string[], _id: string): Promise<any>;
    getChildren(_id: string): Promise<any[]>;
    getItems(page: string, limit: string): Promise<import("./items.service").IResult | {
        message: any;
    }>;
    deleteItem(_id: string): Promise<any>;
}
