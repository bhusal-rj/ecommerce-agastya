import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ChatPromptTemplate } from 'langchain/prompts';
@Injectable()
export class ChainService {
  bufferMemory: BufferMemory;
  chain: ConversationChain;
  async resyncChain() {
    try {
      this.bufferMemory = new BufferMemory();
      const model = new ChatOpenAI({
        modelName: 'text-davinci-003',
        openAIApiKey: '',
      });

      //   const allProducts = await this.productRepo.find({
      //     relations: ['channel', 'inventory'],
      //   });
      //   const allOrders = await this.orderRepo.find({
      //     relations: ['products', 'channel'],
      //   });
      //   const allChannels = await this.channelRepo.find({
      //     relations: ['products', 'inventory', 'orders'],
      //   });
      //   console.log(allProducts, allOrders, allChannels);
      //   const prompt = `Here are the JSON data of the ecommerce platform. The order data are ${allOrders}, channels data are ${allChannels} and products data are ${allProducts}`;

      //   this.chain = new ConversationChain({
      //     llm: model,
      //     memory: this.bufferMemory,
      //     prompt: ChatPromptTemplate.fromMessages([
      //       ['system', 'You are the bot for the ecommerce platform'],
      //       ['user', prompt],
      //     ]),
      //   });
      //   console.log(this.chain);
      const response = await this.chain.run('What is my total sales?');
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepo: Repository<ChannelEntity>,
  ) {
    this.resyncChain();
  }
}
