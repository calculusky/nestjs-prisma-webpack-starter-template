import { ApiResponse } from "@/utils/api-response-util";
import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../../dtos";
import { AuthService } from "../../services";

@Controller({
    path: "auth",
})
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    async signUp(
        @Body(ValidationPipe) signUpDto: SignUpDto
    ): Promise<ApiResponse> {
        return await this.authService.signUp(signUpDto);
    }

    @Post("login")
    async signIn(
        @Body(ValidationPipe) signInDto: SignInDto
    ): Promise<ApiResponse> {
        return await this.authService.signIn(signInDto);
    }
}
