import { Global, Module } from "@nestjs/common";
import { SendgridEmailService, BrevoEmailService } from "./services";

@Global()
@Module({
    providers: [SendgridEmailService, BrevoEmailService],
    exports: [SendgridEmailService, BrevoEmailService],
})
export class EmailModule {}
