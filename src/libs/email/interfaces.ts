export type SendgridProvider = "sendgrid";
export type SendinblueProvider = "sendinblue";
export type EmailProviders = SendgridProvider | SendinblueProvider;

export interface EmailOptions<Provider> {
    provider: Provider;
    apiKey: string;
}

export interface SendgridOptions {
    templateId?: string;
    dynamicTemplateData?: { [key: string]: any };
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export interface SendinblueOptions {
    templateId?: string;
    dynamicTemplateData?: { [key: string]: any };
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export type SendEmailOptions<T> = T extends SendgridProvider
    ? SendgridOptions
    : SendinblueOptions;
