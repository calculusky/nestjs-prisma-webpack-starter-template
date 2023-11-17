import { User, UserType } from "@prisma/client";
import { Request } from "express";

export interface RequestWithUser extends Request {
    user: User;
}

export interface DataStoredInToken {
    sub: string;
}

export interface LoginMeta {
    role: {
        name: string;
        slug: string;
        permissions: string[];
    };
}

export interface UserDataForLogin {
    identifier: string;
    userType: UserType;
    password: string;
    role: {
        name: string;
        slug: string;
        permissions: {
            permission: {
                name: string;
            };
        }[];
    };
}

export interface LoginResponse {
    accessToken: string;
    meta: string;
}
