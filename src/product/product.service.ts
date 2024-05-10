import { Product } from "@prisma/client";
import { ProductRequest } from "./dto/product.dto";
import productRepository from "./product.repository";

const getAllProduct = async (): Promise<Product[]> => {
	const products: Product[] = await productRepository.getAllProduct();
	return products;
};

const getProductById = async (id: number): Promise<Product | null> => {
	const product: Product | null = await productRepository.getProductById(id);
	return product;
};

const createProduct = async (product: ProductRequest): Promise<Product> => {
	const newProduct: Product = await productRepository.createProduct(product);
	return newProduct;
};

const updateProduct = async (id: number, product: ProductRequest): Promise<Product> => {
	const updatedProduct: Product = await productRepository.updateProduct(id, product);
	return updatedProduct;
};

const deleteProduct = async (id: number): Promise<Product> => {
	const deletedProduct: Product = await productRepository.deleteProduct(id);
	return deletedProduct;
};

export default {
	getAllProduct,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
