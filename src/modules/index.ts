import { Module } from "@nestjs/common";
import { WebHookModule } from "./webhook";
import { APIModule } from "./api";
import { CoreModule } from "./core";
@Module({
    imports: [APIModule, CoreModule, WebHookModule],
})
export class AppModule {}
