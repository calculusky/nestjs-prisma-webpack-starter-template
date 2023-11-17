import { jwtSecret } from "@/config";
import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserNotFoundException } from "@/modules/api/user";
import * as AuthError from "../errors";
import { DataStoredInToken, RequestWithUser } from "../interfaces";
import { PrismaService } from "@/modules/core/prisma/services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as RequestWithUser;
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new AuthError.MissingAuthorizationToken(
                "Your Session is unauthorized",
                HttpStatus.UNAUTHORIZED
            );
        }
        try {
            const payload: DataStoredInToken =
                await this.jwtService.verifyAsync(token, {
                    secret: jwtSecret,
                });
            const user = await this.prisma.user.findUnique({
                where: {
                    identifier: payload.sub,
                },
            });
            if (!user) {
                throw new UserNotFoundException(
                    "Your session is unauthorized",
                    HttpStatus.UNAUTHORIZED
                );
            }
            request.user = user;
        } catch (error) {
            switch (true) {
                case error instanceof UserNotFoundException: {
                    throw error;
                }
                case error.name == "PrismaClientKnownRequestError": {
                    throw new AuthError.PrismaNetworkException(
                        "Unable to process request. Please try again",
                        HttpStatus.SERVICE_UNAVAILABLE
                    );
                }

                default: {
                    throw new AuthError.AuthTokenValidationException(
                        "Your session is unauthorized",
                        HttpStatus.UNAUTHORIZED
                    );
                }
            }
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
