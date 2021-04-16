import * as mongoose from 'mongoose';
export declare const ItemSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface Item {
    data: string;
    children: string[];
    isChild: boolean;
    childOf: string;
}
