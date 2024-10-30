// actions/products-action.js

import {
  getDataProducts,
  getDataProductById,
  addDataNewProduct,
  updateDataProduct,
  deleteDataProduct,
  getIndexDataProductById,
} from './product-gateway.js';

export const getProductActions = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(getDataProducts()));
};

export const getProductByIdAction = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = getDataProductById(productId);
  if (product) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(product));
  } else {
    res.statusCode = 404;
    res.end('Product not found');
  }
};

export const createNewProductAction = (req, res) => {
  const { name, price } = req.body;
  const newProduct = addDataNewProduct(name, price);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.end(JSON.stringify(newProduct));
};

export const updateProductAction = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = getIndexDataProductById(productId);
  if (productIndex !== -1) {
    const { name, price } = req.body;
    const productUpdated = updateDataProduct(productIndex, name, price);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(productUpdated));
  } else {
    res.statusCode = 404;
    res.end('Product not found');
  }
};

export const deleteProductAction = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = getIndexDataProductById(productId);
  if (productIndex !== -1) {
    const productDeleted = deleteDataProduct(productIndex);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(productDeleted));
  } else {
    res.statusCode = 404;
    res.end('Product not found');
  }
};
