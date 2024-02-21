import { Injectable } from "@nestjs/common";

@Injectable()
export class WebService {
    health() {
        return {
            success: true,
            message: "OK",
            timestamp: Date.now(),
        };
    }
}
