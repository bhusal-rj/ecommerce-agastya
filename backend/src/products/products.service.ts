import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { createdProductTypes } from './types/product.types';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryEntity } from './entities/inventory.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    let newProduct = this.productRepository.create({
      title: createProductDto.title,
      sku: createProductDto.sku,
      price: createProductDto.price,
      stock: createProductDto.stock,
    });
    const savedProduct = await this.productRepository.save(newProduct);
    newProduct = await this.productRepository.findOne({
      where: { id: newProduct.id },
      relations: ['inventory'],
    });

    const channelArray = createProductDto.channels;

    const savedInventories: InventoryEntity[] = [];
    if (channelArray.length) {
      for (let singleChannel of channelArray) {
        const channel = await this.channelRepository.findOne({
          where: { id: singleChannel.id },
          relations: ['products'],
        });
        channel.products.push(savedProduct);

        if (!channel) throw new Error('Invalid channel id');
        await this.channelRepository.save(channel);
        const inventory = new InventoryEntity();
        inventory.channel = channel;
        inventory.product = savedProduct;
        inventory.stock = singleChannel.stock;
        const savedInventory = await this.inventoryRepository.save(inventory);
        savedInventories.push(savedInventory);

        //notify the backend regarding the product addition
        const data = await fetch(`${channel.url}products`, {
          method: 'POST',
          body: JSON.stringify(createProductDto),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(channel.url);
      }
    }

    newProduct.inventory.push(...savedInventories);
    const newSaved = await this.productRepository.save(newProduct);

    return newProduct;
  }

  async findAll(): Promise<createdProductTypes> {
    const allProducts = await this.productRepository.find({
      relations: ['inventory.channel'],
    });
    return {
      products: allProducts,
      count: allProducts.length,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
