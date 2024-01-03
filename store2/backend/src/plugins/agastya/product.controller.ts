import { Controller, Body, Post } from "@nestjs/common";
import { ProductService } from "./product.services";
import { skuDto } from "./sku.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post("")
  async addProducts(@Body() bd: any) {
    await this.productService.addProducts(bd);
  }

  @Post("sync-stock")
  async syncStock(@Body() skuDto: skuDto) {
    await this.productService.decreaseStock(skuDto);
  }
}
