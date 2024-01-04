import { ChannelEntity } from '../entities/channel.entity';

export interface channelType {
  channels: ChannelEntity[];
  count: number;
}
