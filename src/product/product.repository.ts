import { PrismaClient, Product } from "@prisma/client";
import { ProductRequest } from "./dto/product.dto";

const prisma = new PrismaClient();

const createProduct = async (product: ProductRequest): Promise<Product> => {
	return prisma.product.create({
		data: product,
	});
};

const getProductById = async (id: number): Promise<Product | null> => {
	return prisma.product.findUnique({
		where: {
			id: id,
		},
	});
};

const getAllProduct = async (): Promise<Product[]> => {
	return prisma.product.findMany({});
};

const updateProduct = async (id: number, product: ProductRequest): Promise<Product> => {
	return prisma.product.update({
		where: {
			id: id,
		},
		data: product,
	});
};

const deleteProduct = async (id: number): Promise<Product> => {
	return prisma.product.delete({
		where: {
			id: id,
		},
	});
};

export default {
	createProduct,
	getProductById,
	getAllProduct,
	updateProduct,
	deleteProduct,
};
