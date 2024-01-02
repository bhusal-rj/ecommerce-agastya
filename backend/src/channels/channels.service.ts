import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { channelType } from './types/channel.types';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}
  async create(createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    const newChannel = this.channelRepository.create();
    const toBeCreated = Object.assign(newChannel, createChannelDto);
    return await this.channelRepository.save(toBeCreated);
  }

  async findAllChannels(): Promise<channelType> {
    const allChannels = await this.channelRepository.find();
    return {
      channels: allChannels,
      count: allChannels.length,
    };
  }

  async findOne(id: number): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findOne({ where: { id: id } });
    return channel;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
