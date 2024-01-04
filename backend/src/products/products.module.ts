import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ChainService } from './chain.services';
import { OrderProduct } from 'src/orders/entities/orderProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      InventoryEntity,
      ChannelEntity,
      OrderEntity,
      OrderProduct,
    ]),
    // TypeOrmModule.forFeature([InventoryEntity]),
    // TypeOrmModule.forFeature([ChannelEntity]),
    // TypeOrmModule.forFeature([OrderEntity]),
    // TypeOrmModule.forFeature([OrderProduct]),
  ],
  controllers: [ProductController],
  providers: [ProductsService, ChainService],
})
export class ProductsModule {}
