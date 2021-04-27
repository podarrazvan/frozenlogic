import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  data: { type: String, require: true },
  children: [{ type: String, select: true }],
  isChild: { type: Boolean, require: true },
  childOf: {type: String}
});

export interface Item {
  data: string;
  children: string[];
  isChild: boolean;
  childOf: string;
}
