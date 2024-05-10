export interface UserRequest {
    email: string;
    name: string;
    password: string;
}

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminRequest {
    email: string;
    password: string;
}