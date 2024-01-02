import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createdProductTypes } from './types/product.types';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productServices: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<createdProductTypes> {
    //route for getting all the products
    const addedProducts = await this.productServices.findAll();
    return addedProducts;
  }

  @Post()
  async createProduct(
    @Body() createProductDTO: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productServices.createProduct(createProductDTO);
  }
}
