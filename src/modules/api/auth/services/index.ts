import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "@/modules/api/user/services";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto, SignInDto } from "../dtos";
import { DuplicateUserException } from "@/modules/api/user";
import * as bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { customAlphabet, urlAlphabet } from "nanoid";
import { InvalidCredentialException } from "../errors";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async signUp(options: SignUpDto) {
        const user = await this.userService.findUserByEmail(options.email);
        if (user) {
            throw new DuplicateUserException(
                "An account already exists with this email",
                HttpStatus.BAD_REQUEST
            );
        }
        const hashedPassword = await this.hashPassword(options.password);
        const createUserOptions: Prisma.UserCreateInput = {
            firstName: options.firstName,
            lastName: options.lastName,
            email: options.email,
            identifier: customAlphabet(urlAlphabet, 20)(),
            password: hashedPassword,
        };

        const createdUser = await this.userService.createUser(
            createUserOptions
        );
        const accessToken = await this.jwtService.signAsync({
            sub: createdUser.identifier,
        });

        //send sms or email notification here

        return {
            success: true,
            message: "Account successfully created",
            data: {
                accessToken,
            },
        };
    }

    async signIn(options: SignInDto) {
        const user = await this.userService.findUserByEmail(options.email);
        if (!user) {
            throw new InvalidCredentialException(
                "Incorrect email or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        const isValidPassword = await this.comparePassword(
            options.password,
            user.password
        );
        if (!isValidPassword) {
            throw new InvalidCredentialException(
                "Incorrect email or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.identifier,
        });

        return {
            success: true,
            message: "User successfully logged-in",
            data: {
                accessToken,
            },
        };
    }
}
