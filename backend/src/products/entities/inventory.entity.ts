import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ChannelEntity } from 'src/channels/entities/channel.entity';

@Entity({ name: 'Inventory' })
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.inventory)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => ChannelEntity)
  @JoinColumn()
  channel: ChannelEntity;

  @Column()
  stock: number;
}
