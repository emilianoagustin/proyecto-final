import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/create", createProduct);

router.delete("/:id", deleteProduct);

export default router;
