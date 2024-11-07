const MyExpress = require("express");
const app = MyExpress();

app.use(MyExpress.json());
let books = [];

// Endpoint untuk menambahkan buku baru
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
  res.status(200).json(newBook);
});

// Endpoint untuk mendapatkan semua buku
app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

// Endpoint untuk mendapatkan buku berdasarkan ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((p) => p.book_id === bookId); // Gunakan 'book_id' bukan 'id'
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Endpoint untuk memperbarui buku berdasarkan ID
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((p) => p.book_id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      price: req.body.price,
      stock: req.body.stock,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

// Endpoint untuk menghapus buku berdasarkan ID
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((p) => p.book_id === bookId); // Gunakan 'book_id' bukan 'id'
  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log("Books API listening on http://localhost:3000");
});
