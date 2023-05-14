import { HttpException } from "@nestjs/common";

export class ContactUsEmailException extends HttpException {
    name = "ContactUsEmailException";
}
