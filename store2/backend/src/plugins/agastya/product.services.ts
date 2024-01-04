import { Injectable } from "@nestjs/common";

import {
  LanguageCode,
  ProductService as ProdService,
  Product,
  ProductVariant,
  ProductVariantService,
  RequestContextService,
  TaxCategory,
  TransactionalConnection,
} from "@vendure/core";
import { skuDto } from "./sku.dto";

@Injectable()
export class ProductService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly requestContextService: RequestContextService,
    private readonly productService: ProdService,
    private readonly productVariantService: ProductVariantService
  ) {}

  async addProducts(product: any) {
    const ctx = await this.requestContextService.create({
      apiType: "admin",
    });

    const createdProducts = await this.productService.create(ctx, {
      translations: [
        {
          languageCode: LanguageCode.en,
          description: product?.description,
          name: product?.title,
          slug: product?.title,
        },
      ],
    });

    //create the product variant
    const createdProductVariant = await this.productVariantService.create(ctx, [
      {
        sku: product?.sku,
        productId: createdProducts.id,
        price: product?.price,
        stockLevels: [
          {
            stockOnHand: product?.stock,
            stockLocationId: 1,
          },
        ],
        translations: [
          {
            languageCode: LanguageCode.en,
            name: product?.title,
          },
        ],
      },
    ]);
    console.log(createdProductVariant);
    // return;
    // const productRepo = this.connection.rawConnection.getRepository(Product);
    // const created = productRepo.create({
    //   name: product?.title,
    //   slug: product?.title,
    //   customFields: {},
    //   description: product?.description,
    //   enabled: true,
    //   assets: [],
    //   facetValues: [],
    //   variants: [],

    //   translations: [
    //     {
    //       languageCode: LanguageCode.en,
    //       name: product?.title || "",
    //       description: product?.description || "",
    //       slug: product?.title || "",
    //       customFields: {},
    //     },
    //   ],
    // });
    // const saved = await productRepo.save(created);
    // console.log(saved);
    // const productVariant =
    //   this.connection.rawConnection.getRepository(ProductVariant);
    // const createdVariant = productVariant.create({
    //   productId: saved.id,
    //   price: product.price,
    //   sku: product?.sku,
    //   options: [],
    //   stockLevels: [
    //     {
    //       stockLocationId: "1",
    //       stockOnHand: product.stock,
    //     },
    //   ],

    //   translations: [
    //     {
    //       languageCode: LanguageCode.en,
    //       name: product?.title || "Demo Product",
    //     },
    //   ],
    //   enabled: true,
    //   listPrice: product.price,
    //   name: product.name,
    // });
    // const savedVariant = await productVariant.save(createdVariant);

    // console.log(savedVariant);
  }

  async decreaseStock(productSku: skuDto) {
    const sku = productSku.sku;
    const ctx = await this.requestContextService.create({ apiType: "admin" });
    const productVariant = (await this.productVariantService.findAll(ctx))
      .items;
    for (let variant of productVariant) {
      if (variant.sku == sku) {
        const variantSku = await this.productVariantService.findOne(
          ctx,
          variant.id,
          ["stockLevels"]
        );
        if (!variantSku) break;
        const stockOnHand =
          variantSku.stockLevels[0].stockOnHand - productSku.qty;

        return await this.productVariantService.update(ctx, [
          {
            id: variant.id,
            stockOnHand: stockOnHand,
          },
        ]);
      }
    }
  }
}
