import { StringifyOptions } from "querystring";

export interface ContactUsParams {
    email: string;
    phone: StringifyOptions;
    message: string;
    name: string;
}
