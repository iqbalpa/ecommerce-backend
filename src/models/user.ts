export interface User {
	id: number;
	email: string;
	name: string;
	password: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Admin {
	id: number;
	email: string;
	password: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}
