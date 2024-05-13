import { Router, Request, Response } from "express";
import { UserProduct } from "@prisma/client";
// Service
import wishlistService from "./wishlist.service";

const wishlistRouter = Router();

wishlistRouter.post("/", async (req: Request, res: Response) => {
	const userId: number = req.user.id;
	const productId: number = parseInt(req.body.productId);
	const newWishlist: UserProduct = await wishlistService.createWishlist(userId, productId);
	res.status(201).json({
		message: "added to wishlist",
		data: newWishlist,
	});
});

wishlistRouter.delete("/", async (req: Request, res: Response) => {
	const userId: number = req.user.id;
	const productId: number = parseInt(req.body.productId);
	const deletedWishlist: UserProduct = await wishlistService.deleteWishlist(userId, productId);
	res.status(200).json({
		message: "removed from wishlist",
		data: deletedWishlist,
	});
});

export default wishlistRouter;
