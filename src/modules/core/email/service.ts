import { sendgridApiKey, sendinblueApiKey } from "@/config";
import { Email } from "@/libs/email";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendgridEmailService extends Email<"sendgrid"> {
    constructor() {
        super({ apiKey: sendgridApiKey, provider: "sendgrid" });
    }
}

@Injectable()
export class SendinblueEmailService extends Email<"sendinblue"> {
    constructor() {
        super({ apiKey: sendinblueApiKey, provider: "sendinblue" });
    }
}
