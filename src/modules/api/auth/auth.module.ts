import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret, TOKEN_EXPIRATION } from "@/config";
import { AuthController } from "./controllers/v1/auth.controller";
export * from "./types/auth";
export * from "./errors/auth.error";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtSecret,
            signOptions: { expiresIn: TOKEN_EXPIRATION },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
