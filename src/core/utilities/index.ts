import { encryptSecret } from "@/config";
import { AES } from "crypto-js";
import { GenerateIDOptions } from "./types";
import { customAlphabet, urlAlphabet } from "nanoid";

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

export const formatName = (name: string) => {
    const formatted = name.trim().toLowerCase();
    return `${formatted.charAt(0).toUpperCase()}${formatted.slice(1)}`;
};

export const generateRandomNum = (size: number): string => {
    let str = "";
    for (let i = 0; i < size; i++) {
        const rand = Math.floor(Math.random() * 10);
        str += rand;
    }
    return str;
};
// customAlphabet("1234567890", 5)()
export const generateId = (options: GenerateIDOptions): string => {
    const alphaNumeric = "1234567890ABCDEFGH";
    const numeric = "0123456789";
    // const length = options.length ?? 15;

    switch (options.type) {
        case "identifier": {
            return customAlphabet(urlAlphabet, 16)();
        }
        case "referralCode": {
            return customAlphabet(alphaNumeric, 5)();
        }
        case "otp": {
            return customAlphabet(numeric, 5)();
        }

        default:
            break;
    }
};
