import { UserProduct } from "@prisma/client";
import wishlistRepository from "./wishlist.repository";

const createWishlist = async (userId: number, productId: number): Promise<UserProduct> => {
	const wishlist: UserProduct = await wishlistRepository.createWishlist(userId, productId);
	return wishlist;
};

const deleteWishlist = async (userId: number, productId: number): Promise<UserProduct> => {
	const deletedWishlist: UserProduct = await wishlistRepository.deleteWishlist(userId, productId);
	return deletedWishlist;
};

export default {
	createWishlist,
	deleteWishlist,
};
