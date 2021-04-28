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
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
let ItemsController = class ItemsController {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async addtem(item) {
        return await this.itemsService.insertItem(item);
    }
    async updateChildren(children, id) {
        return await this.itemsService.updateChildren(id, children);
    }
    async removeChild(child, id) {
        return await this.itemsService.removeChild(id, child);
    }
    async updateData(data, id) {
        return await this.itemsService.editItem(id, data);
    }
    async getChildren(id) {
        return await this.itemsService.getChildren(id);
    }
    async getItems(page, limit) {
        return await this.itemsService.getFirstItems(+page, +limit);
    }
    async deleteItem(id) {
        return await this.itemsService.deleteItem(id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "addtem", null);
__decorate([
    common_1.Put('children'),
    __param(0, common_1.Body('children')),
    __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateChildren", null);
__decorate([
    common_1.Put('remove-child'),
    __param(0, common_1.Body('child')), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "removeChild", null);
__decorate([
    common_1.Put('update'),
    __param(0, common_1.Body('data')), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateData", null);
__decorate([
    common_1.Get('children/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getChildren", null);
__decorate([
    common_1.Get(':page/:limit'),
    __param(0, common_1.Param('page')), __param(1, common_1.Param('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getItems", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteItem", null);
ItemsController = __decorate([
    common_1.Controller('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controllers.js.map