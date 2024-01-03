import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'OrderQuantity' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderProduct)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderProduct)
  @JoinColumn()
  order: OrderEntity;
}
