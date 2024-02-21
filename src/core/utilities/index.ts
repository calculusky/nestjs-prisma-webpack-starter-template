import { encryptSecret } from "@/config";
import { AES } from "crypto-js";

export function buildResponse<
    TData extends Record<string, any> = Record<string, any>
>(options: Omit<ApiResponse<TData>, "success">): ApiResponse<TData> {
    const response: ApiResponse<TData> = {
        success: true,
        message: options.message,
    };

    if (options.data) {
        response.data = options.data;
    }
    return response;
}

export const encrypt = (data: any) => {
    return AES.encrypt(JSON.stringify(data), encryptSecret).toString();
};
