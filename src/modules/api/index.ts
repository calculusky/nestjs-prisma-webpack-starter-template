import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { UserModule } from "./user";
import { AppHealthModule } from "./_appHealth";

@Module({
    imports: [AppHealthModule, UserModule, AuthModule],
})
export class APIModule {}
