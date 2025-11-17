import * as Model from "../models/Products.js";

export async function getAllProducts() {
  return await Model.getAllProducts();
}

export async function getProductById(id) {
  return await Model.getProductById(id);
}

export async function createProduct(data) {
  return await Model.createProduct({ ...data });
}

export async function deleteProduct(id) {
  return await Model.deleteProduct(id);
}
