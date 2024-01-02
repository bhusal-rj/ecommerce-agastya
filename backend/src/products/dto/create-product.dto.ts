import { ApiProperty } from '@nestjs/swagger';

export class ChannelTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  stock: number;
}
export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  stock: number;

  @ApiProperty({ type: [ChannelTypeDto] })
  channels: ChannelTypeDto[];

  @ApiProperty()
  sku: string;
}
