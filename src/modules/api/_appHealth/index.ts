import { Module } from "@nestjs/common";
import { AppHealthController } from "./controller";

@Module({
    controllers: [AppHealthController],
})
export class AppHealthModule {}
