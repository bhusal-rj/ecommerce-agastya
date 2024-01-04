import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
