const http = require("http");
const url = require("url");

let products = [
  {
    name: "Produk Contoh",
    price: 20000,
    stock: 100,
    description: "Ini adalah produk contoh",
    category: "Elektronik",
  },
]; // menyimpan produk dalam array

let nextProductId = 1;

// merespons dengan JSON
const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// membuat server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { pathname } = parsedUrl;
  const method = req.method;

  if (pathname === "/api/products" && method === "POST") {
    createProduct(req, res);
  } else if (pathname === "/api/products" && method === "GET") {
    readProducts(res);
  } else if (pathname.startsWith("/api/products/") && method === "GET") {
    const productId = pathname.split("/")[3];
    readProductById(res, productId);
  } else if (pathname.startsWith("/api/products/") && method === "PUT") {
    const productId = pathname.split("/")[3];
    updateProduct(req, res, productId);
  } else if (pathname.startsWith("/api/products/") && method === "DELETE") {
    const productId = pathname.split("/")[3];
    deleteProduct(res, productId);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const createProduct = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, price, stock, description, category } = JSON.parse(body);
    const newProduct = {
      product_id: nextProductId++,
      name,
      price,
      stock,
      description,
      category,
    };
    products.push(newProduct);
    respondWithJSON(res, 201, {
      message: "Produk berhasil ditambahkan",
      product_id: newProduct.product_id,
    });
  });
};

const readProducts = (res) => {
  respondWithJSON(res, 200, products);
};

const readProductById = (res, id) => {
  const product = products.find((p) => p.product_id === parseInt(id));
  if (product) {
    respondWithJSON(res, 200, product);
  } else {
    respondWithJSON(res, 404, { message: "Produk tidak ditemukan" });
  }
};

const updateProduct = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, price, stock, description, category } = JSON.parse(body);
    const product = products.find((p) => p.product_id === parseInt(id));
    if (product) {
      product.name = name;
      product.price = price;
      product.stock = stock;
      product.description = description;
      product.category = category;
      respondWithJSON(res, 200, { message: "Produk berhasil diperbarui" });
    } else {
      respondWithJSON(res, 404, { message: "Produk tidak ditemukan" });
    }
  });
};

const deleteProduct = (res, id) => {
  const index = products.findIndex((p) => p.product_id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    respondWithJSON(res, 200, { message: "Produk berhasil dihapus" });
  } else {
    respondWithJSON(res, 404, { message: "Produk tidak ditemukan" });
  }
};

server.listen(3000, () => {
  console.log("Products API is running on http://localhost:3000");
});
