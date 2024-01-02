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

    let newOrder = new OrderEntity();
    newOrder.orderId = createOrderDto.orderId;
    newOrder.shipAddress1 = createOrderDto.shipAddress1;
    newOrder.shipCity = createOrderDto.shipCity;
    newOrder.shipCountry = createOrderDto.shipCountry;
    newOrder.shipPostalCode = createOrderDto.shipPostalCode;
    const savedOrder = await this.orderRepository.save(newOrder);
    newOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['products'],
    });

    if (!channelRequest) throw new Error('There has been an error');
    for (let productDto of createOrderDto.products) {
      const product = await this.productRepository.findOne({
        where: { sku: productDto.sku },
      });
      if (!product) return;
      const inventory = await this.inventoryRepository
        .createQueryBuilder('inventory')
        .leftJoinAndSelect('inventory.channel', 'channel')
        .andWhere('channel.id = :id', { id: channelRequest.id })
        .leftJoinAndSelect('inventory.product', 'product')
        .andWhere('product.sku = :sku', { sku: productDto.sku })
        .getOne();

      newOrder.products.push(product);
      const boughtQty = productDto.qty;
      inventory.stock = inventory.stock - boughtQty;
      product.stock = product.stock - boughtQty;
      console.log(product.stock);
      const saved = await this.inventoryRepository.save(inventory);

      await this.productRepository.save(product);
      console.log(saved);
    }

    await this.orderRepository.save(newOrder);

    //notify other about the stock syncing
  }

  async findAll() {
    const allOrders = await this.orderRepository.find({
      relations: ['products'],
    });
    return {
      orders: allOrders,
      count: allOrders.length,
    };
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
