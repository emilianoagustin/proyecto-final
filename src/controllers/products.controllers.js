import * as Model from "../models/Products.js";

export async function getAllProducts(req, res) {
  const { category } = req.query;

  const products = await Model.getAllProducts();

  return category
    ? res.json(
        products.filter((product) => product.categories.includes(category))
      )
    : res.json(products);
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await Model.getProductById(id);

  return !product
    ? res
        .status(404)
        .json({ success: false, message: "Product doesn't exists" })
    : res.json(product);
}
export function createProduct(req, res) {
  res.json({ message: "message from createProduct" });
}
export function deleteProduct(req, res) {
  res.json({ message: "message from deleteProduct" });
}
