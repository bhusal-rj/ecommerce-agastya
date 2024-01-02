import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([InventoryEntity]),
    TypeOrmModule.forFeature([ChannelEntity]),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
