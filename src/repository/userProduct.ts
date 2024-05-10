import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserProduct = (userId: number, productId: number) => {
	return prisma.userProduct.create({
		data: {
			userId: userId,
			productId: productId,
		},
	});
};

export const deleteUserProduct = (userId: number, productId: number) => {
	return prisma.userProduct.delete({
		where: {
			userId_productId: {
				userId: userId,
				productId: productId,
			},
		},
	});
};
