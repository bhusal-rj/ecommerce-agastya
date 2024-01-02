import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { InventoryEntity } from 'src/products/entities/inventory.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    const channelRequest = await this.channelRepository.findOne({
      where: { url: createOrderDto.url },
      relations: ['inventory', 'products'],
    });

    const newOrder = this.orderRepository.create();
    const createdOrder = Object.assign(newOrder, createOrderDto);

    if (!channelRequest) throw new Error('There has been an error');
    for (let productDto of createOrderDto.products) {
      const product = await this.productRepository.findOne({
        where: { sku: productDto.sku },
      });
      const inventory = await this.inventoryRepository
        .createQueryBuilder('inventory')
        .leftJoinAndSelect('inventory.channel', 'channel')
        .andWhere('channel.id = :id', { id: channelRequest.id })
        .leftJoinAndSelect('inventory.product', 'product')
        .andWhere('product.sku = :sku', { sku: productDto.sku })
        .getOne();
      const boughtQty = productDto.qty;
      inventory.stock = inventory.stock - boughtQty;
      product.stock = product.stock - boughtQty;
      const saved = await this.inventoryRepository.save(inventory);
      await this.productRepository.save(product);
      console.log(saved);
    }
    await this.orderRepository.save(createdOrder);

    //notify other about the stock syncing
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
