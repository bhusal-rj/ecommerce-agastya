import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelEntity } from './entities/channel.entity';
import { channelType } from './types/channel.types';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<ChannelEntity> {
    return this.channelsService.create(createChannelDto);
  }

  @Get()
  findAllChannels(): Promise<channelType> {
    return this.channelsService.findAllChannels();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChannelEntity> {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelsService.remove(+id);
  }
}
