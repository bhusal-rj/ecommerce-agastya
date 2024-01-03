import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToMany(() => ProductEntity, (product) => product.orderProduct)
  @JoinTable()
  product: ProductEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.orderProduct)
  @JoinTable()
  order: OrderEntity;
}
