import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { InventoryEntity } from 'src/products/entities/inventory.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { OrderProduct } from './entities/orderProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      InventoryEntity,
      ChannelEntity,
      ProductEntity,
      OrderProduct,
    ]),
    // TypeOrmModule.forFeature([InventoryEntity]),
    // TypeOrmModule.forFeature([ChannelEntity]),
    // TypeOrmModule.forFeature([ProductEntity]),
    // TypeOrmModule.forFeature([OrderProduct]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
