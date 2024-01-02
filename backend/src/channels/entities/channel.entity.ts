import { InventoryEntity } from 'src/products/entities/inventory.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Channel' })
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @ManyToMany(() => ProductEntity, (product) => product.channel)
  @JoinTable()
  products: ProductEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.channel)
  @JoinColumn()
  inventory: InventoryEntity[];
}
