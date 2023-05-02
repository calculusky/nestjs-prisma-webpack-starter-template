import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "@/modules/api/user/service";
import { CreateUserDto } from "../../dto";

@Controller({
    path: "users",
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}
