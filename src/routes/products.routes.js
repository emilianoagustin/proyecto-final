import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/create", createProduct);

router.delete("/:id", deleteProduct);

router.put("/update/:id", updateProduct);

export default router;
