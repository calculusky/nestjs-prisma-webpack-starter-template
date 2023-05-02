import { Module } from "@nestjs/common";
import { UserController } from "./controllers/v1";
import { UserService } from "./service";
export * from "./interfaces";
export * from "./errors";

@Module({
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
