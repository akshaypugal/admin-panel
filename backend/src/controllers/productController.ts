import { Request, Response } from "express";
import { AppDatasource } from "../config/database";
import { products1 } from "../entities/Product";

const productRepository = AppDatasource.getRepository(products1);

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productRepository.find();
        res.json(products);  // ✅ Fix: Sending the correct variable
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sku, name, price, images } = req.body;
        const product = productRepository.create({ sku, name, price, images });
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await productRepository.findOne({ where: { id: Number(id) } });

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        productRepository.merge(product, req.body);
        await productRepository.save(product);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await productRepository.delete(id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
