"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ItemsService = class ItemsService {
    constructor(itemModel) {
        this.itemModel = itemModel;
        this.items = [];
    }
    async insertItem(data, children, isChild, childOf) {
        const doc = { data, children, isChild, childOf };
        const newItem = new this.itemModel(doc);
        const result = await newItem.save();
        return result;
    }
    async updateChildren(_id, children) {
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
        const results = {};
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
        }
        catch (e) {
            return { message: e.message };
        }
    }
    async getChildren(_id) {
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
        const result = await this.itemModel.findOneAndDelete({ _id }).exec();
        return result;
    }
};
ItemsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Item')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map
