import { Controller, Body, Post } from "@nestjs/common";
import { ProductService } from "./product.services";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post("")
  async addProducts(@Body() bd: any) {
    await this.productService.addProducts(bd);
  }
}
