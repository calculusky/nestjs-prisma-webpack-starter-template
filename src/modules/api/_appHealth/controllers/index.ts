import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";

// Health check
@Controller({
    version: VERSION_NEUTRAL,
    path: "health",
})
export class AppHealthController {
    @Get()
    health() {
        return {
            success: true,
            message: "OK",
            timestamp: Date.now(),
        };
    }
}
