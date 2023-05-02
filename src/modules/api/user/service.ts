import { SendgridEmailService } from "@/modules/core/email/service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(private sgMailService: SendgridEmailService) {}

    async createUser(options: CreateUserDto) {
        await this.sgMailService.send({
            to: options.email,
            from: "edu@gmail.com",
            subject: "tester",
            text: "test content of email",
        });
        return { ...options, date: new Date(), test: true };
    }
}
