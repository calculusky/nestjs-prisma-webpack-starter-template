import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/auth.dto";
import * as bcrypt from "bcryptjs";
import { UserType } from "@prisma/client";
import { InvalidCredentialException } from "../errors/auth.error";
import * as Utils from "@/core/utilities";
import { PrismaService } from "@/modules/core/prisma/services/prisma.service";
import { LoginMeta, LoginResponse, UserDataForLogin } from "../types/auth";
import * as Config from "@/config";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Config.BCRYPT_SALT);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async signIn(options: SignInDto): Promise<ApiResponse<LoginResponse>> {
        const user = await this.prisma.user.findUnique({
            where: { email: options.email },
            select: {
                identifier: true,
                userType: true,
                password: true,
                role: {
                    select: {
                        name: true,
                        slug: true,
                        permissions: {
                            select: {
                                permission: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new InvalidCredentialException(
                "Incorrect email or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        if (user.userType !== UserType.ADMIN) {
            throw new InvalidCredentialException(
                "Incorrect email or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        const isValidPassword = await this.comparePassword(
            options.password,
            user.password
        );
        if (!isValidPassword) {
            throw new InvalidCredentialException(
                "Incorrect email or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.identifier,
        });

        const meta = this.buildLoginMeta(user);

        return Utils.buildResponse({
            message: "Login successful",
            data: { accessToken, meta },
        });
    }

    private buildLoginMeta(user: UserDataForLogin): string {
        const permissions = user.role.permissions.map((p) => p.permission.name);

        const loginMeta: LoginMeta = {
            role: {
                name: user.role.name,
                slug: user.role.slug,
                permissions: permissions,
            },
        };

        return Utils.encrypt(loginMeta);
    }
}
