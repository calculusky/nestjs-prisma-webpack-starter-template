import { PrismaService } from "@/modules/core/prisma/services";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(options: Prisma.UserCreateInput) {
        return await this.prisma.user.create({
            data: options,
        });
    }

    async findUserByIdentifier(identifier: string) {
        return await this.prisma.user.findFirst({
            where: { identifier: identifier },
        });
    }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
}
