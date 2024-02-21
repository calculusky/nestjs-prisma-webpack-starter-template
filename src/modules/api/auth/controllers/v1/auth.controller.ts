import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { SignInDto } from "../../dtos/auth.dto";
import { AuthService } from "../../services/auth.service";

@Controller({
    path: "auth",
})
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }
}
