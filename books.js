const MyExpress = require("express");
const app = new MyExpress();

app.use(MyExpress().json());
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

app.post("/api/books", (req, res) => {
  const newBook = {
    book_id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    price: req.body.price,
    stock: req.body.stock,
  };
  books.push(newBook);
  res.setHeader(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(newBook));
});

app.get("/api/books", (req, res) => {
  res.setHeader(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(books));
});

app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((p) => p.id === bookId);
  if (book) {
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(book));
  } else {
    res.statusCode = 404;
    res.end("book not found");
  }
});

app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((p) => p.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].name = req.body.name;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(books[bookIndex]));
  } else {
    res.statusCode = 404;
    res.end("Book not found");
  }
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((p) => p.id === bookId);
  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(bookIndex[0]));
  } else {
    res.statusCode = 404;
    res.end('Book not found');
  }
});

app.listen(3000, () => {
  console.log("Books API listening on http://localhost:3000");
});
