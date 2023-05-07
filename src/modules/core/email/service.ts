import { sendgridApiKey, sendinblueApiKey } from "@/config";
import TransactionalEmail from "@calculusky/transactional-email";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendgridEmailService extends TransactionalEmail<"sendgrid"> {
    constructor() {
        super({ apiKey: sendgridApiKey, provider: "sendgrid" });
    }
}

@Injectable()
export class SendinblueEmailService extends TransactionalEmail<"sendinblue"> {
    constructor() {
        super({ apiKey: sendinblueApiKey, provider: "sendinblue" });
    }
}
