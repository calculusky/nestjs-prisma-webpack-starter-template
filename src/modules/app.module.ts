import { Module } from "@nestjs/common";
import { WebhookModule } from "./webhook/webhook.module";
import { APIModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";
@Module({
    imports: [APIModule, CoreModule, WebhookModule],
})
export class AppModule {}
