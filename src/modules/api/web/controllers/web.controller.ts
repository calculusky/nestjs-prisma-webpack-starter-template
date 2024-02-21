import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { WebService } from "../services/web.service";

@Controller({
    version: VERSION_NEUTRAL,
})
export class WebController {
    constructor(private readonly webService: WebService) {}

    // Health check
    @Get("health")
    health() {
        return this.webService.health();
    }
}
