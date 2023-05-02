import { HttpException } from "@nestjs/common";

export class EmailProviderException extends HttpException {
    name = "EmailProviderException";
}

export class EmailException extends HttpException {
    name = "EmailException";
}
