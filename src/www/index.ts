import * as morgan from "morgan";

import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import { INestApplication, VersioningType } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import helmet from "helmet";
import { AllExceptionsFilter } from "@/core/exception/http";
import { classValidatorPipeInstance } from "@/core/exception/http/pipe";
import { frontendDevOrigin, isDevEnvironment } from "@/config";

export interface CreateServerOptions {
    port: number;
    production?: boolean;
    whitelistedDomains?: any;
}

export default async (
    options: CreateServerOptions
): Promise<INestApplication> => {
    const app = await NestFactory.create(AppModule, {
        //logger: false,
    });
    const whitelist = options.whitelistedDomains ?? [];
    if (isDevEnvironment) {
        whitelist.push(frontendDevOrigin);
    }
    const corsOptions: CorsOptions = {
        origin: whitelist,
        allowedHeaders: ["Authorization", "X-Requested-With", "Content-Type"],
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    };

    app.use(helmet());
    app.enableCors(corsOptions);
    app.use(morgan(options.production ? "combined" : "dev"));

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
        prefix: "api/v",
    });

    app.useGlobalPipes(classValidatorPipeInstance());
    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
    app.listen(options.port);

    return app;
};
