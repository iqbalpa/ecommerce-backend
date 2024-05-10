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

// the parameter should be userId and productId
export const deleteUserProduct = (id: number) => {
	return prisma.userProduct.delete({
		where: {
			id: id,
		},
	});
};
