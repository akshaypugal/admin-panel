import express from "express";
import { getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController"; // ✅ Fix: Changed `getProducts` to `getProduct`

const router = express.Router();

router.get("/", getProduct); // ✅ Fix: Renamed `getProducts` to `getProduct`
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
