import { Router, Request, Response } from "express";
import { Product } from "@prisma/client";
import { ProductRequest } from "../dto/product";
import { getAllProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../repository/product";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
	const products: Product[] = await getAllProduct();
	res.status(200).json({
		data: products,
	});
});

productRouter.get("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const product: Product | null = await getProductById(id);
	if (!product) {
		res.status(404).json({ error: "product not found" });
	} else {
		res.status(200).json({ data: product });
	}
});

productRouter.post("/", async (req: Request, res: Response) => {
	const productData: ProductRequest = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		stock: parseInt(req.body.stock),
		image: req.body.image,
		adminId: parseInt(req.body.adminId),
	};
	const newProduct: Product = await createProduct(productData);
	res.status(201).json({ data: newProduct });
});

productRouter.put("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const productData: ProductRequest = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		stock: parseInt(req.body.stock),
		image: req.body.image,
		adminId: parseInt(req.body.adminId),
	};
	const updatedProduct: Product = await updateProduct(id, productData);
	res.status(200).json({ data: updatedProduct });
});

productRouter.delete("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const deletedProduct: Product = await deleteProduct(id);
	res.status(200).json({
		message: "product deleted",
		deletedProduct: deletedProduct,
	});
});

export default productRouter;
