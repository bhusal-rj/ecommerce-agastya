import { ProductEntity } from 'src/products/entities/product.entity';
import { JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity)
  @JoinColumn()
  products: ProductEntity[];
}
