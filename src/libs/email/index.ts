import { EmailOptions, EmailProviders, SendEmailOptions } from "./interfaces";
import * as sendgridMail from "@sendgrid/mail";
import { EmailException, EmailProviderException } from "./errors";
export * from "./interfaces";

export class Email<Provider extends EmailProviders> {
    constructor(protected emailOptions: EmailOptions<Provider>) {}

    async send<T = Provider>(options: SendEmailOptions<T>) {
        switch (this.emailOptions.provider) {
            case "sendgrid":
                await this.handleSendgrid(options);
                break;

            case "sendinblue":
                await this.handleSendinblue();
                break;

            default: {
                throw new EmailProviderException(
                    "No email provider selected",
                    500
                );
            }
        }
    }

    //handle sendgrid
    private async handleSendgrid<T = Provider>(options: SendEmailOptions<T>) {
        try {
            sendgridMail.setApiKey(this.emailOptions.apiKey);
            sendgridMail.setSubstitutionWrappers("{{", "}}");

            const message: any = {
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                templateId: options.templateId,
                dynamicTemplateData: options.dynamicTemplateData,
            };
            await sendgridMail.send(message);
        } catch (error) {
            throw new EmailException("Failed to send Email", 500);
        }
    }

    //handle sendinblue
    private handleSendinblue() {
        console.log("test");
    }
}
