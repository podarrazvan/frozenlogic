import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './items.model';
import { Model } from 'mongoose';
import { IPaginatedResult } from 'src/shared/interfaces/paginated-result.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<any>) {}

  async insertItem(item: Item) {
    const newItem = await new this.itemModel(item);
    return await newItem.save();
  }

  async updateChildren(_id: string, children: string[]) {
    return await this.itemModel
      .findByIdAndUpdate({ _id }, { children })
      .exec();
  }

  async removeChild(_id, child) {
    const item = await this.itemModel.findById({ _id }).exec();
    let children = item.children;
    const index = children.indexOf(child);
    children.splice(index, 1);
    await this.itemModel
      .findByIdAndUpdate({ _id }, { children })
      .exec();
    this.deleteItem(child);
  }

  async editItem(_id, data) {
    return await this.itemModel.findByIdAndUpdate({ _id }, { data }).exec();
  }

  async getFirstItems(page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: IPaginatedResult = {};

    if (endIndex < (await this.itemModel.find({ isChild: false }).countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await this.itemModel
        .find({ isChild: false })
        .limit(limit)
        .skip(startIndex)
        .exec();
      return results;
    } catch (e) {
      return { message: e.message };
    }
  }

  async getChildren(_id: string) {
    const item = await this.itemModel.findById({ _id }).exec();
    const children = item.children;
    let responseData = [];
    for (let child of children) {
      const result = await this.itemModel.findById({ _id: child }).exec();
      responseData.push(result);
    }
    if (responseData.length === children.length) {
      return responseData;
    }
  }

  async deleteItem(_id) {
    return await this.itemModel.findOneAndDelete({ _id }).exec();
  }
}

