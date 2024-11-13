const {
  createBookGateway,
  getBooksGateway,
  getBookByIdGateway,
  updateBookGateway,
  deleteBookGateway,
} = require("../gateways/books-gateway");

module.exports.createBookAction = (req, res) => {
  const { title, author, genre, year, price, stock } = req.body;
  const newBook = createBookGateway(title, author, genre, year, price, stock);
  res.status(201).json({
    message: "Buku berhasil ditambahkan",
    book_id: newBook.book_id,
  });
};

module.exports.getBooksAction = (req, res) => {
  const books = getBooksGateway();
  res.status(200).json(books);
};

module.exports.getBookByIdAction = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = getBookByIdGateway(bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
};

module.exports.updateBookAction = (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, genre, year, price, stock } = req.body;
  const updatedBook = updateBookGateway(
    bookId,
    title,
    author,
    genre,
    year,
    price,
    stock
  );

  if (updatedBook) {
    res.status(200).json({
      message: "Buku berhasil diperbarui",
      book_id: updatedBook.book_id,
    });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
};

module.exports.deleteBookAction = (req, res) => {
  const bookId = parseInt(req.params.id);
  const deletedBook = deleteBookGateway(bookId);

  if (deletedBook) {
    res.status(200).json({
      message: "Buku berhasil dihapus",
      book_id: deletedBook.book_id,
    });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
};
