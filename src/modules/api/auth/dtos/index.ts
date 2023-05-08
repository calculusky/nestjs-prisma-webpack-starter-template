import { IsEmail, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
