import { Module } from "@nestjs/common";
import { EmailModule } from "./email";
import { PrismaService } from "./prisma/service";

@Module({
    imports: [EmailModule],
    providers: [PrismaService],
})
export class CoreModule {}
