import { config } from "dotenv";

import validate, {
    RequiredEnvironment,
    RequiredEnvironmentTypes,
} from "@boxpositron/vre";

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
        name: "SENDGRID_API_KEY",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "BREVO_API_KEY",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "JWT_SECRET",
        type: RequiredEnvironmentTypes.String,
    },
];

validate(runtimeEnvironment);

//app
export const allowedDomains =
    process.env.ALLOWED_DOMAINS && process.env.ALLOWED_DOMAINS.split(",");
export const isProduction: boolean = process.env.NODE_ENV === "production";
export const port: number = parseInt(process.env.PORT ?? "4000");

//email
export const sendgridApiKey = process.env.SENDGRID_API_KEY;
export const brevoApiKey = process.env.SENDINBLUE_API_KEY;

//jwt
export const jwtSecret = process.env.JWT_SECRET;
