import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity)
  @JoinColumn()
  products: ProductEntity[];

  @Column()
  orderId: number;

  @Column()
  shipPostalCode: string;

  @Column()
  shipAddress1: string;

  @Column()
  shipCity: string;

  @Column()
  shipCountry: string;

  @Column()
  qty: number;

  @Column()
  title: string;

  @Column()
  sku: string;

  @Column()
  totalprice: number;

  @ManyToOne(() => ChannelEntity, (channel) => channel.orders)
  channel: number;
}
