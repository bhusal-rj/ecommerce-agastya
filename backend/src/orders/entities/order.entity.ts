import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
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

  @ManyToOne(() => ChannelEntity, (channel) => channel.orders)
  channel: number;
}
