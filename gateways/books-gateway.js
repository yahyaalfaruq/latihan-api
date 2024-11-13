let books = [];

module.exports.getBooksGateway = () => books;

module.exports.getBookByIdGateway = (bookId) => {
  return books.find((p) => p.book_id === bookId);
};

module.exports.createBookGateway = (
  title,
  author,
  genre,
  year,
  price,
  stock
) => {
  const newBook = {
    book_id: books.length + 1,
    title,
    author,
    genre,
    year,
    price,
    stock,
  };
  books.push(newBook);
  return newBook;
};

module.exports.getIndexBookById = (bookId) => {
  return books.findIndex((p) => p.book_id === bookId);
};

module.exports.updateBookGateway = (
  bookId,
  title,
  author,
  genre,
  year,
  price,
  stock
) => {
  const bookIndex = books.findIndex((p) => p.book_id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      author,
      genre,
      year,
      price,
      stock,
    };
    return books[bookIndex];
  }
  return null;
};

module.exports.deleteBookGateway = (bookId) => {
  const bookIndex = books.findIndex((p) => p.book_id === bookId);
  if (bookIndex !== -1) {
    const [deletedBook] = books.splice(bookIndex, 1);
    return deletedBook;
  }
  return null;
};
