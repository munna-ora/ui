export interface LoginRequest {
    phone: number;
    password: string;
}
export interface LoginResponse {
    status: number;
    message: string;
    data: string;
}
export interface LogoutResponse {
    status: number;
    message: string;
    data: string;
}
