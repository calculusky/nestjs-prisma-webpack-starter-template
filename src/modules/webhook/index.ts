import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { PaystackWebHookModule } from "./paystack";

@Module({
    imports: [
        PaystackWebHookModule,
        RouterModule.register([
            { path: "webhooks", module: PaystackWebHookModule },
        ]),
    ],
})
export class WebHookModule {}
