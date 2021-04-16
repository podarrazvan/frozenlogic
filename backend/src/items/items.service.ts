import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Item } from "./items.model";
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  items: Item[] = [];

  constructor(@InjectModel('Item') private itemModel: Model<any>){}

  async insertItem(data: string, children: string[], isChild: boolean, childOf: string) {
    const doc = {data, children, isChild,childOf};
    const newItem =  new this.itemModel(doc);
    const result = await newItem.save();
    return result;
  }

  async updateChildren(_id: string,children: string[],) {
    const result= this.itemModel.findByIdAndUpdate({_id},{children}).exec();
    return result;
  }

  async removeChild(_id, child) {
    const item = await this.itemModel.findById({_id}).exec();
    let children = item.children;
    const index = children.indexOf(child);
    children.splice(index,1);
    const result= this.itemModel.findByIdAndUpdate({_id},{children}).exec();
    return result;
  }

  editItem(_id, data) {
    const result= this.itemModel.findByIdAndUpdate({_id},{data}).exec();
    return result;
  }

  async getItems() {
    const result = await this.itemModel.find().exec();
    return result;
  }

  async deleteItem(_id) {
    const result = await this.itemModel.findOneAndDelete({_id}).exec();
  }
}
