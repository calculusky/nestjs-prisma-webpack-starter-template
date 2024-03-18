import { config } from "dotenv";

import validate, {
    RequiredEnvironment,
    RequiredEnvironmentTypes,
} from "@boxpositron/vre";

export * from "./constants";

config();

const runtimeEnvironment: RequiredEnvironment[] = [
    {
        name: "PORT",
        type: RequiredEnvironmentTypes.Number,
    },
    {
        name: "ALLOWED_DOMAINS",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "JWT_SECRET",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "ENCRYPT_SECRET",
        type: RequiredEnvironmentTypes.String,
    },
];

validate(runtimeEnvironment);

//app
export const allowedDomains =
    process.env.ALLOWED_DOMAINS && process.env.ALLOWED_DOMAINS.split(",");
export const isProduction: boolean = process.env.NODE_ENV === "production";
export const port: number = parseInt(process.env.PORT ?? "4000");

//jwt
export const jwtSecret = process.env.JWT_SECRET;

//prod deployment env
export const isProdEnvironment = process.env.ENVIRONMENT === "production";

//encrypt
export const encryptSecret: string = process.env.ENCRYPT_SECRET;

export const frontendDevOrigin = [/^http:\/\/localhost:\d+$/];
