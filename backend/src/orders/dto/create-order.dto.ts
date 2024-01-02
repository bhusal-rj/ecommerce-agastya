import { ApiProperty } from '@nestjs/swagger';

export class ProductInfoDto {
  @ApiProperty()
  qty: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  totalprice: number;
}

export class CreateOrderDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  shipPostalCode: string;

  @ApiProperty()
  shipAddress1: string;

  @ApiProperty()
  shipCity: string;

  @ApiProperty()
  shipCountry: string;

  @ApiProperty({ type: [ProductInfoDto] })
  products: ProductInfoDto[];
}
