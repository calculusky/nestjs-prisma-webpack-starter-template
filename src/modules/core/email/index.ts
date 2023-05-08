import { Global, Module } from "@nestjs/common";
import { SendgridEmailService, SendinblueEmailService } from "./services";

@Global()
@Module({
    providers: [SendgridEmailService, SendinblueEmailService],
    exports: [SendgridEmailService, SendinblueEmailService],
})
export class EmailModule {}
