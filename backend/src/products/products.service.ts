import { Injectable } from '@nestjs/common';
import { CreateProductDto, createMessageDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { createdProductTypes } from './types/product.types';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryEntity } from './entities/inventory.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ChainService } from './chain.services';
import { ChatPromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly langchainService: ChainService,
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
        // const data = await fetch(`${channel.url}products`, {
        //   method: 'POST',
        //   body: JSON.stringify(createProductDto),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

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

  bufferMemory: BufferMemory;
  chain: ConversationChain;
  input: any;
  async getInformationFromAi(message: createMessageDto) {
    try {
      this.bufferMemory = new BufferMemory();
      const model = new ChatOpenAI({
        modelName: 'gpt-3.5-turbo-16k',
        openAIApiKey: process.env.API_KEY,
      });

      const allProducts = await this.productRepository.find({
        relations: ['channel', 'inventory'],
      });
      const allOrders = await this.orderRepository.find({
        relations: ['products', 'channel'],
      });
      const allChannels = await this.channelRepository.find({
        relations: ['products', 'inventory', 'orders'],
      });
      const data = {
        allProducts,
        allOrders,
        allChannels,
      };
      this.input = data;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          'You are an ecommerce bot having the products,orders and channel',
        ],
        ['human', `{input} + ${message?.message}`],
      ]);
      this.chain = new LLMChain({
        prompt: chatPrompt,
        llm: model,
        memory: new BufferMemory(),
      });
      const responseFromAi = await this.chain.call({
        input: JSON.stringify(data),
      });
      return responseFromAi;
    } catch (err) {
      console.log(err);
    }
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
