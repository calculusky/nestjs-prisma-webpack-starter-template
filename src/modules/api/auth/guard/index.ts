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
import { UserService } from "../../user/services";
import {
    AuthTokenValidationException,
    InvalidAuthTokenException,
} from "../errors";
import { DataStoredInToken, RequestWithUser } from "../interfaces";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithUser = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new InvalidAuthTokenException(
                "Unauthorized",
                HttpStatus.UNAUTHORIZED
            );
        }
        try {
            const payload: DataStoredInToken =
                await this.jwtService.verifyAsync(token, {
                    secret: jwtSecret,
                });
            const user = await this.userService.findUserByIdentifier(
                payload.identifier
            );
            if (!user) {
                throw new UserNotFoundException(
                    "Unauthorized",
                    HttpStatus.UNAUTHORIZED
                );
            }
            request.user = user;
        } catch (error) {
            switch (true) {
                case error instanceof UserNotFoundException: {
                    throw error;
                }
                default: {
                    throw new AuthTokenValidationException(
                        "Unauthorized",
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
