import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from './entities/channel.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEntity]),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
