import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { InventoryEntity } from 'src/products/entities/inventory.entity';
import { OrderProduct } from './entities/orderProduct.entity';

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
    @InjectRepository(OrderProduct)
    private readonly orderProduct: Repository<OrderProduct>,
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
      relations: ['products', 'orderProduct'],
    });

    if (!channelRequest) throw new Error('There has been an error');
    console.log(createOrderDto.products);
    for (let productDto of createOrderDto.products) {
      const product = await this.productRepository.findOne({
        where: { sku: productDto.sku },
        relations: ['orderProduct', 'channel'],
      });
      for (let channel of product?.channel) {
        const dataSent = await fetch(`${channel.url}/products/sync-product`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            sku: productDto.sku,
            qty: productDto.qty,
          }),
        });
      }
      if (!product) return;
      let productOrder = this.orderProduct.create();
      productOrder.qty = productDto.qty;
      const sav = await this.orderProduct.save(productOrder);

      // productOrder.product.push(product);
      newOrder.orderProduct.push(productOrder);
      product.orderProduct.push(productOrder);
      const inventory = await this.inventoryRepository
        .createQueryBuilder('inventory')
        .leftJoinAndSelect('inventory.channel', 'channel')
        .andWhere('channel.id = :id', { id: channelRequest.id })
        .leftJoinAndSelect('inventory.product', 'product')
        .andWhere('product.sku = :sku', { sku: productDto.sku })
        .getOne();

      await this.orderProduct.save(productOrder);

      // product.qty = productDto.qty;
      newOrder.products.push(product);
      const boughtQty = productDto.qty;
      inventory.stock = inventory.stock - boughtQty;
      product.stock = product.stock - boughtQty;

      const saved = await this.inventoryRepository.save(inventory);

      await this.productRepository.save(product);
      console.log('saved', saved);
    }

    const saved = await this.orderRepository.save(newOrder);
    console.log(saved);

    //notify other about the stock syncing
  }

  async findAll() {
    const allOrders = await this.orderRepository.find({
      relations: ['products', 'orderProduct'],
    });
    for (let orders of allOrders) {
      orders.products.forEach((element, index) => {
        element.qty = orders.orderProduct[index]?.qty || 0;
      });
    }
    return {
      orders: allOrders,
      count: allOrders.length,
    };
  }

  async findOne(id: number) {
    const allOrders = await this.orderRepository.findOne({
      relations: ['products', 'orderProduct'],
      where: { id: id },
    });
    if (!allOrders) return;

    allOrders.products.forEach((element, index) => {
      element.qty = allOrders.orderProduct[index]?.qty || 0;
    });
    console.log(allOrders);
    return {
      orders: allOrders,
      // count: allOrders.length,
    };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
