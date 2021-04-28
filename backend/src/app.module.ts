import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environment';

@Module({
  imports: [ItemsModule,MongooseModule.forRoot(environment.database) ],
  controllers: [],
  providers: [],
})
export class AppModule {}
