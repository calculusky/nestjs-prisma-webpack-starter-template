import {
    SendgridEmailService,
    SendinblueEmailService,
} from "@/modules/core/email/service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(private sbMailService: SendinblueEmailService) {}

    async createUser(options: CreateUserDto) {
        const resp = await this.sbMailService.send({
            to: [{ email: "calculusky@gmail.com" }],
            // se: "admin@chinedumvalentine.com",
            subject: "Hi Dear",
            textContent: "How are you?",
        });

        return { ...options, date: new Date(), test: true };
    }
}
