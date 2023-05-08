import { Module } from "@nestjs/common";
import { EmailModule } from "./email";
import { PrismaModule } from "./prisma";

@Module({
    imports: [EmailModule, PrismaModule],
})
export class CoreModule {}
