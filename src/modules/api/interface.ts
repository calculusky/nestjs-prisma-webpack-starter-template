export interface Data {
    [key: string]: any;
}
export interface APIResponse {
    success: boolean;
    message: string;
    data?: Data;
}
