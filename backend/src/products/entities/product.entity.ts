import { ChannelEntity } from 'src/channels/entities/channel.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryEntity } from './inventory.entity';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ChannelEntity, (channel) => channel.products, {
    nullable: true,
  })
  @JoinColumn()
  channel: ChannelEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  @JoinColumn()
  inventory: InventoryEntity[];

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @Column({ default: 0 })
  qty: number;
}
