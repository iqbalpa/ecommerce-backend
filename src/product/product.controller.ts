import { Router, Request, Response } from "express";
import { Product } from "@prisma/client";
import { ProductRequest } from "./dto/product.dto";
import productService from "./product.service";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
	const products: Product[] = await productService.getAllProduct();
	res.status(200).json({
		data: products,
	});
});

productRouter.get("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const product: Product | null = await productService.getProductById(id);
	if (!product) {
		res.status(404).json({ error: "product not found" });
	} else {
		res.status(200).json({ data: product });
	}
});

// need to extract and get the adminId from token
productRouter.post("/", async (req: Request, res: Response) => {
	const productData: ProductRequest = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		stock: parseInt(req.body.stock),
		image: req.body.image,
		adminId: parseInt(req.body.adminId),
	};
	const newProduct: Product = await productService.createProduct(productData);
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
	const updatedProduct: Product = await productService.updateProduct(id, productData);
	res.status(200).json({ data: updatedProduct });
});

productRouter.delete("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const deletedProduct: Product = await productService.deleteProduct(id);
	res.status(200).json({
		message: "product deleted",
		deletedProduct: deletedProduct,
	});
});

export default productRouter;
