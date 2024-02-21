import { Module } from "@nestjs/common";
import { UserController } from "./controllers/v1/user.controller";
import { UserService } from "./services/user.service";
export * from "./interfaces/user";
export * from "./errors/user.error";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
