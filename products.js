// actions/products-action.js

import {
  getDataProducts,
  getDataProductById,
  addDataNewProduct,
  updateDataProduct,
  deleteDataProduct,
  getIndexDataProductById,
} from "./product-gateway.js";

const setJsonHeader = (res) => res.setHeader("Content-Type", "application/json");

export const getProductActions = (req, res) => {
  setJsonHeader(res);
  res.end(JSON.stringify(getDataProducts()));
};

export const getProductByIdAction = (req, res) => {
  const product = getDataProductById(parseInt(req.params.id));
  setJsonHeader(res);
  if (product) {
    res.end(JSON.stringify(product));
  } else {
    res.statusCode = 404;
    res.end("Product not found");
  }
};

export const createNewProductAction = (req, res) => {
  const { name, price, stock, description, category } = req.body;
  const newProduct = addDataNewProduct(name, price, stock, description, category);
  setJsonHeader(res);
  res.statusCode = 201;
  res.end(JSON.stringify({ message: "Product added successfully", product_id: newProduct.id }));
};

export const updateProductAction = (req, res) => {
  const productIndex = getIndexDataProductById(parseInt(req.params.id));
  if (productIndex !== -1) {
    const { name, price, stock, description, category } = req.body;
    const updatedProduct = updateDataProduct(productIndex, name, price, stock, description, category);
    setJsonHeader(res);
    res.end(JSON.stringify({ message: "Product updated successfully", product_id: updatedProduct.id }));
  } else {
    res.statusCode = 404;
    res.end("Product not found");
  }
};

export const deleteProductAction = (req, res) => {
  const productIndex = getIndexDataProductById(parseInt(req.params.id));
  if (productIndex !== -1) {
    const deletedProduct = deleteDataProduct(productIndex);
    setJsonHeader(res);
    res.end(JSON.stringify({ message: "Product deleted successfully", product_id: deletedProduct.id }));
  } else {
    res.statusCode = 404;
    res.end("Product not found");
  }
};
