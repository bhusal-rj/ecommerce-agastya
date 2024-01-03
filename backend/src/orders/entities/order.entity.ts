import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from './orderProduct.entity';

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
  channel: ChannelEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @OneToMany(() => OrderProduct, (op) => op.order)
  @JoinColumn()
  orderProduct: OrderProduct[];
}
