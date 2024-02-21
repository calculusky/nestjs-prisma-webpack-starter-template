import { Module } from "@nestjs/common";
import { PaystackController } from "./controllers/paystack.controller";
import { PaystackService } from "./services/paystack.service";
export * from "./interfaces/paystack";

@Module({
    imports: [],
    providers: [PaystackService],
    controllers: [PaystackController],
})
export class PaystackModule {}
