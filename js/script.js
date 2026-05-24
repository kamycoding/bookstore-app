const renderBooks = () => {
  const bookList = document.getElementById("bookList");

  const booksHtml = books
    .map((book, index) => getBookTemplate(book, index))
    .join("");

  bookList.innerHTML = booksHtml;
};

const toggleLike = (index) => {
  console.log(index);
};

renderBooks();
