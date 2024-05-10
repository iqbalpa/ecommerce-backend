export interface AdminRequest {
	email: string;
	password: string;
}

export interface AdminResponse {
	id: number;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	role: string;
}
