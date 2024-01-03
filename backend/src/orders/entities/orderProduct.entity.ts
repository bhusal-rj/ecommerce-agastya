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

<<<<<<< HEAD
  @ManyToMany(() => ProductEntity, (product) => product.orderProduct)
  @JoinTable()
  product: ProductEntity[];
=======
  @ManyToOne(() => ProductEntity, (product) => product.orderProduct)
  @JoinColumn()
  product: ProductEntity;
>>>>>>> 5eb40a905e469679626664efe930c8b4a352de03

  @ManyToMany(() => OrderEntity, (order) => order.orderProduct)
  @JoinTable()
  order: OrderEntity;
}
