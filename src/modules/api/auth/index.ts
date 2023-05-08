import { Module } from "@nestjs/common";
import { AuthService } from "./services";
import { UserModule } from "../user";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "@/config";
import { AuthController } from "./controllers/v1";
export * from "./interfaces";
export * from "./errors";
export * from "./guard";
export * from "./dtos";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtSecret,
            signOptions: { expiresIn: "1hr" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
