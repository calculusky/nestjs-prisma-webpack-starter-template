import { encryptSecret } from "@/config";
import { AES } from "crypto-js";

export function buildResponse<
    TData extends Record<string, any> = Record<string, any>
>(options: Omit<ApiResponse<TData>, "success">): ApiResponse<TData> {
    return {
        success: true,
        message: options.message,
        data: options.data,
    };
}

export const encrypt = (data: any) => {
    return AES.encrypt(JSON.stringify(data), encryptSecret).toString();
};
