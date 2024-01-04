import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';

@Injectable()
export class ChainService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepo: Repository<ChannelEntity>,
  ) {
    // this.resyncChain();
  }
}
