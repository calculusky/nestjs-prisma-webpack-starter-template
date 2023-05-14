import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class AddToNewsletterDto {
    @IsEmail({}, { message: "Please enter a valid email" })
    email: string;
}

export class ContactUsDto {
    @IsString()
    name: string;

    @IsEmail({}, { message: "Please enter a valid email" })
    email: string;

    @IsString()
    phone: string;

    @IsString()
    message: string;
}
