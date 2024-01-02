import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create();
    const createdOrder = Object.assign(newOrder, createOrderDto);
    const savedOrder = await this.orderRepository.save(createdOrder);
    const channelRequest = await this.channelRepository.findOne({
      where: { url: createOrderDto.url },
      relations: ['inventory', 'products'],
    });
    const selectedProduct = await this.productRepository.findOne({
      where: { sku: createOrderDto.sku },
      relations: ['inventory', 'channel.inventory'],
    });
    console.log(selectedProduct);
    const currentChannel = await this.channelRepository
      .createQueryBuilder('channel')
      .where('channel.url = :url', { url: createOrderDto.url })

      .getOne();
    console.log(currentChannel);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
