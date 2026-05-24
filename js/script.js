const renderBooks = () => {
  const bookList = document.getElementById("bookList");

  const booksHtml = books
    .map((book, index) => getBookTemplate(book, index))
    .join("");

  bookList.innerHTML = booksHtml;
};

const toggleLike = (index) => {
  const book = books[index];

  book.liked = !book.liked;
  book.likes += book.liked ? 1 : -1;

  renderBooks();
};

renderBooks();
