import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { InventoryEntity } from 'src/products/entities/inventory.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    TypeOrmModule.forFeature([InventoryEntity]),
    TypeOrmModule.forFeature([ChannelEntity]),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
