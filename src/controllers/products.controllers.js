import * as ProductService from "../services/products.service.js";

export async function getAllProducts(req, res) {
  const { category } = req.query;

  const products = await ProductService.getAllProducts();

  return category
    ? res.json(
        products.filter((product) => product.categories.includes(category))
      )
    : res.json(products);
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await ProductService.getProductById(id);

  return !product
    ? res
        .status(404)
        .json({ success: false, message: "Product doesn't exists" })
    : res.json(product);
}

export async function createProduct(req, res) {
  let { name, price, categories } = req.body;
  if (!name || !price || !categories)
    return res
      .status(400)
      .json({ success: false, message: "There's a missing product property" });

  if (typeof price === "string") price = Number(price);

  const product = await ProductService.createProduct({
    name,
    price,
    categories,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  const deleted = await ProductService.deleteProduct(id);

  !deleted
    ? res.status(404).json({ success: false, message: "Product not found" })
    : res.status(204).json({
        success: true,
        message: `Product with id ${id} deleted successfully`,
      });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  let { name, price, categories } = req.body;

  if (typeof price === "string") price = Number(price);

  if (!name || !price || !categories)
    return res
      .status(422)
      .json({
        success: false,
        message:
          "There's a missing product property required to perform the update",
      });

  const updatedProduct = await ProductService.updateProduct(id, {
    name,
    price,
    categories,
  });

  if (!updatedProduct)
    return res
      .status(404)
      .json({ success: false, message: "Product doesn't exists" });

  res.status(201).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
}
