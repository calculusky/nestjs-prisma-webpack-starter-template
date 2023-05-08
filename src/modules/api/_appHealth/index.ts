import { Module } from "@nestjs/common";
import { AppHealthController } from "./controllers";

@Module({
    controllers: [AppHealthController],
})
export class AppHealthModule {}
