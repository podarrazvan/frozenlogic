import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  //! use object!
  async addtem(
    @Body('data') data: string,
    @Body('children') children: string[],
    @Body('isChild') isChild: boolean,
    @Body('childOf') childOf: string
  ) {
    const item = await this.itemsService.insertItem(
      data,
      children,
      isChild,
      childOf
    );
    return item;
  }

  @Put('children')
  async updateChildren(
    @Body('children') children: string[],
    @Body('_id') _id: string
  ) {
    const item = await this.itemsService.updateChildren(_id, children);
    return item;
  }

  @Put('remove-child')
  async removeChild(@Body('child') child: string[], @Body('_id') _id: string) {
    const item = await this.itemsService.removeChild(_id, child);
    return item;
  }

  @Put('update')
  async updateData(@Body('data') data: string[], @Body('_id') _id: string) {
    const item = await this.itemsService.editItem(_id, data);
    return item;
  }

  @Get(':page/:limit')
  async getItems(@Param('page') page: string, @Param('limit') limit: string) {
    return this.itemsService.getFirstItems(+page, +limit);
  }

  @Get('children/:id')
  getChildren(@Param('id') _id: string) {
    return this.itemsService.getChildren(_id);
  }

  @Delete(':id')
  deleteItem(@Param('id') _id: string) {
    return this.itemsService.deleteItem(_id);
  }
}
