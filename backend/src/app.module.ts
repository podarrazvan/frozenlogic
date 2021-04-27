import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environment';

@Module({
  imports: [ItemsModule,MongooseModule.forRoot(environment.database) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
