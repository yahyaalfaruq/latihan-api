// app.js

import express from "express";
import {
  getProductActions,
  getProductByIdAction,
  createNewProductAction,
  updateProductAction,
  deleteProductAction,
} from "./products.js";

const app = express();

// Middleware untuk mengurai JSON body
app.use(express.json());

app.get("/api/products", getProductActions);
app.get("/api/products/:id", getProductByIdAction);
app.post("/api/products", createNewProductAction);
app.put("/api/products/:id", updateProductAction);
app.delete("/api/products/:id", deleteProductAction);

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
