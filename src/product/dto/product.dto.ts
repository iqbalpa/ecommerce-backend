export interface ProductRequest {
	name: string;
	description: string;
	price: string;
	stock: number;
	image: string;
	adminId: number;
}

export interface ProductResponse {
	id: number;
	name: string;
	description: string;
	price: string;
	stock: number;
	image: string;
	adminId: number;
	createdAt: Date;
	updatedAt: Date;
}