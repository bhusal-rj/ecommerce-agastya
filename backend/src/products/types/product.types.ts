import { ProductEntity } from '../entities/product.entity';

export interface createdProductTypes {
  products: ProductEntity[];
  count: number;
}
