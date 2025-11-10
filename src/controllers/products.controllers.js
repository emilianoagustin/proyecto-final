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
export async function createProduct(req, res) {
  const { name, price, categories } = req.body;
  if (!name || !price || !categories)
    return res
      .status(400)
      .json({ success: false, message: "There's a missing product property" });
  const product = await Model.createProduct({ name, price, categories });

  res.status(201).json(product);
}
export function deleteProduct(req, res) {
  res.json({ message: "message from deleteProduct" });
}
