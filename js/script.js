const renderBooks = () => {
  const bookList = document.getElementById("bookList");

  const booksHtml = books.map((book) => getBookTemplate(book)).join("");

  bookList.innerHTML = booksHtml;
};

renderBooks();
