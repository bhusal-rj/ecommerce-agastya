import { Injectable } from "@nestjs/common";
import {
  LanguageCode,
  ProductService as ProdService,
  Product,
  ProductVariant,
  TransactionalConnection,
} from "@vendure/core";

@Injectable()
export class ProductService {
  constructor(
    private readonly productService: ProdService,
    private readonly connection: TransactionalConnection
  ) {}

  async addProducts(product: any) {
    const productRepo = this.connection.rawConnection.getRepository(Product);
    console.log(product);
    const created = productRepo.create({
      name: product?.title,
      slug: product?.title,
      description: product?.description,
      enabled: true,

      translations: [
        {
          languageCode: LanguageCode.en,
          name: product?.title || "",
          description: product?.description || "",
          slug: product?.title || "",
        },
      ],
    });
    const productVariant =
      this.connection.rawConnection.getRepository(ProductVariant);
    const createdVariant = productVariant.create({
      productId: created.id,
      price: product.price || 40,
      sku: product?.sku || "demo",

      translations: [
        {
          languageCode: LanguageCode.en,
          name: product?.title,
        },
      ],
    });

    console.log(createdVariant);
    const saved = await productRepo.save(created);
    console.log("sacw", saved);
  }
}
