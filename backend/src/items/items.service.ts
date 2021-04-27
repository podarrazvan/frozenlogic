import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './items.model';
import { Model } from 'mongoose';
import { response } from 'express';

@Injectable()
export class ItemsService {
  items: Item[] = [];

  constructor(@InjectModel('Item') private itemModel: Model<any>) {}

  async insertItem(
    data: string,
    children: string[],
    isChild: boolean,
    childOf: string
  ) {
    const doc = { data, children, isChild, childOf };
    const newItem = new this.itemModel(doc);
    const result = await newItem.save();
    return result;
  }

  async updateChildren(_id: string, children: string[]) {
    const result = this.itemModel
      .findByIdAndUpdate({ _id }, { children })
      .exec();
    return result;
  }

  async removeChild(_id, child) {
    const item = await this.itemModel.findById({ _id }).exec();
    let children = item.children;
    const index = children.indexOf(child);
    children.splice(index, 1);
    const result = this.itemModel
      .findByIdAndUpdate({ _id }, { children })
      .exec();
    this.deleteItem(child);
  }

  editItem(_id, data) {
    const result = this.itemModel.findByIdAndUpdate({ _id }, { data }).exec();
    return result;
  }

  async getFirstItems(page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: IResult = {};

    if (endIndex < (await this.itemModel.countDocuments().exec())) {
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
    const item = await this.itemModel.findById({ _id }).exec(); //! try to get only children
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
    const result = await this.itemModel.findOneAndDelete({ _id }).exec();
    return result;
  }
}

export interface IResult {
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
