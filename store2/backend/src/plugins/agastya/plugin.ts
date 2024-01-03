import {
  VendurePlugin,
  PluginCommonModule,
  EventBus,
  LanguageCode,
  Logger,
  OrderPlacedEvent,
} from "@vendure/core";
import { OnApplicationBootstrap } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.services";

@VendurePlugin({
  imports: [PluginCommonModule],
  compatibility: ">2.0.0",
  providers: [Logger, ProductService],
  controllers: [ProductController],
})
export class StorePlugin implements OnApplicationBootstrap {
  constructor(private eventBus: EventBus) {}

  async onApplicationBootstrap() {
    this.eventBus.ofType(OrderPlacedEvent).subscribe(async (event) => {
      const line = event?.order?.lines[0];
      const data = {
        url: "http://localhost:5000/",
        orderId: event.order.id.toString(),
        shipPostalCode: event.order?.shippingAddress?.postalCode || "",
        shipAddress1: event.order?.shippingAddress?.streetLine1 || "",
        shipCity: event.order?.shippingAddress?.city || "",
        shipCountry: event?.order?.shippingAddress?.country || "",
        shipCountryCode: event?.order?.shippingAddress?.country || "",

        qty: line.quantity,
        title: line.productVariant?.name,
        sku: line.productVariant.sku,
        price: line.productVariant.price / 10,
        totalprice: line.productVariant.priceWithTax / 10,
        taxamount:
          (line.productVariant.priceWithTax - line.productVariant.price) / 10,

        channelId: process.env.SELRO_CHANNEL_ID,
      };

      await fetch("http://localhost:3002/api/v1/orders/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    });
  }
}
