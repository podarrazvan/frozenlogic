import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Item } from './items.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  async addtem(@Body('item') item: Item) {
    return await this.itemsService.insertItem(item);
  }

  @Put('children')
  async updateChildren(
    @Body('children') children: string[],
    @Body('id') id: string
  ) {
    return await this.itemsService.updateChildren(id, children);
  }

  @Put('remove-child')
  async removeChild(@Body('child') child: string[], @Body('id') id: string) {
    return await this.itemsService.removeChild(id, child);
  }

  @Put('update')
  async updateData(@Body('data') data: string[], @Body('id') id: string) {
    return await this.itemsService.editItem(id, data);
  }

  @Get('children/:id')
  async getChildren(@Param('id') id: string) {
    return await this.itemsService.getChildren(id);
  }

  @Get(':page/:limit')
  async getItems(@Param('page') page: string, @Param('limit') limit: string) {
    return await this.itemsService.getFirstItems(+page, +limit);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemsService.deleteItem(id);
  }
}
