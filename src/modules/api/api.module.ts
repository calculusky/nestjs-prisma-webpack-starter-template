import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { WebModule } from "./web/web.module";

@Module({
    imports: [WebModule, UserModule, AuthModule],
})
export class APIModule {}
