import { Injectable } from "@nestjs/common";
import { PaystackEvent } from "../interfaces/paystack";

@Injectable()
export class PaystackService {
    // constructor() {}

    async processWebhook(event: PaystackEvent): Promise<void> {
        //handle event
        console.log(event);
    }
}
