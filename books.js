const http = require("http");
const url = require("url");

let books = [
  {
    book_id: 1,
    title: "Judul Buku",
    author: "Penulis Buku",
    genre: "Fiksi",
    year: 2020,
    price: 75000,
    stock: 100,
  },
];

let nextBookId = 2;

const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { pathname } = parsedUrl;
  const method = req.method;

  if (pathname === "/api/books" && method === "POST") {
    createBook(req, res);
  } else if (pathname === "/api/books" && method === "GET") {
    readBooks(res);
  } else if (pathname.startsWith("/api/books/") && method === "GET") {
    const id = pathname.split("/")[3];
    readBookById(res, id);
  } else if (pathname.startsWith("/api/books/") && method === "PUT") {
    const id = pathname.split("/")[3];
    updateBook(req, res, id);
  } else if (pathname.startsWith("/api/books/") && method === "DELETE") {
    const id = pathname.split("/")[3];
    deleteBook(res, id);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const createBook = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, author, genre, year, price, stock } = JSON.parse(body);
    const newBook = {
      book_id: nextBookId++,
      title,
      author,
      genre,
      year,
      price,
      stock,
    };
    books.push(newBook);
    respondWithJSON(res, 201, {
      message: "Buku berhasil ditambahkan",
      book_id: newBook.book_id,
    });
  });
};

const readBooks = (res) => {
  respondWithJSON(res, 200, books);
};

const readBookById = (res, id) => {
  const book = books.find((b) => b.book_id === parseInt(id));
  if (book) {
    respondWithJSON(res, 200, book);
  } else {
    respondWithJSON(res, 404, { message: "Buku tidak ditemukan" });
  }
};

const updateBook = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, author, genre, year, price, stock } = JSON.parse(body);
    const book = books.find((b) => b.book_id === parseInt(id));
    if (book) {
      book.title = title;
      book.author = author;
      book.genre = genre;
      book.year = year;
      book.price = price;
      book.stock = stock;
      respondWithJSON(res, 200, { message: "Buku berhasil diperbarui" });
    } else {
      respondWithJSON(res, 404, { message: "Buku tidak ditemukan" });
    }
  });
};

const deleteBook = (res, id) => {
  const bookIndex = books.findIndex((b) => b.book_id === parseInt(id));
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    respondWithJSON(res, 200, { message: "Buku berhasil dihapus" });
  } else {
    respondWithJSON(res, 404, { message: "Buku tidak ditemukan" });
  }
};

server.listen(3000, () => {
  console.log("Books API listening on http://localhost:3000");
});
