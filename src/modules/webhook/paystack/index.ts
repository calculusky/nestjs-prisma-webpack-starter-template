import { Module } from "@nestjs/common";
import { PaystackWebhookController } from "./controller";
import { PaystackWebhookService } from "./service";
export * from "./interfaces";

@Module({
    imports: [],
    providers: [PaystackWebhookService],
    controllers: [PaystackWebhookController],
})
export class PaystackWebHookModule {}
