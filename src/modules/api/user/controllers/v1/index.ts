import { AuthGuard } from "@/modules/api/auth/guard";
import { Controller, UseGuards } from "@nestjs/common";

@UseGuards(AuthGuard)
@Controller({
    path: "users",
})
export class UserController {
    // constructor(private readonly userService: UserService) {}
}
