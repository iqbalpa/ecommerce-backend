import { PrismaClient, UserProduct } from "@prisma/client";

const prisma = new PrismaClient();

const createWishlist = (userId: number, productId: number): Promise<UserProduct> => {
	return prisma.userProduct.create({
		data: {
			userId: userId,
			productId: productId,
		},
	});
};

const deleteWishlist = (userId: number, productId: number): Promise<UserProduct> => {
	return prisma.userProduct.delete({
		where: {
			userId_productId: {
				userId: userId,
				productId: productId,
			},
		},
	});
};

export default {
	createWishlist,
	deleteWishlist
}