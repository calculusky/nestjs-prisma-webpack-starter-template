import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { PaystackModule } from "./paystack/paystack.module";

@Module({
    imports: [
        PaystackModule,
        RouterModule.register([{ path: "webhooks", module: PaystackModule }]),
    ],
})
export class WebhookModule {}
