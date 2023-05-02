import { Module } from "@nestjs/common";
import { UserModule } from "./user";
import { AppHealthModule } from "./_appHealth";

@Module({
    imports: [UserModule, AppHealthModule],
})
export class APIModule {}
