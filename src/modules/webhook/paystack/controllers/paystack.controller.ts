import { Body, Controller, Post, Res, VERSION_NEUTRAL } from "@nestjs/common";
import { Response } from "express";
import { PaystackEvent } from "../interfaces/paystack";
import { PaystackService } from "../services/paystack.service";

@Controller({
    path: "paystack",
    version: VERSION_NEUTRAL,
})
export class PaystackController {
    constructor(private readonly paystackWebhookService: PaystackService) {}

    @Post()
    async processWebhook(@Body() event: PaystackEvent, @Res() res: Response) {
        res.sendStatus(200);
        await this.paystackWebhookService.processWebhook(event);
    }
}
