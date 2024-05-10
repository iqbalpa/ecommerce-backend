import { PrismaClient } from "@prisma/client";
import { ProductRequest } from "../dto/product";

const prisma = new PrismaClient();

export const createProduct = async (product: ProductRequest) => {
	return prisma.product.create({
		data: product,
	});
};

export const getProductById = async (id: number) => {
	return prisma.product.findUnique({
		where: {
			id: id,
		},
	});
};

export const getAllProduct = async () => {
	return prisma.product.findMany({});
};

export const updateProduct = async (id: number, product: ProductRequest) => {
	return prisma.product.update({
		where: {
			id: id,
		},
		data: product,
	});
};

export const deleteProduct = async (id: number) => {
	return prisma.product.delete({
		where: {
			id: id,
		},
	});
};
