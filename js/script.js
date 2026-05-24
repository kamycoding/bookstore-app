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

const addComment = (event, index) => {
  event.preventDefault();

  const commentInput = event.target.elements.comment;
  const commentText = commentInput.value.trim();

  if (commentText === "") return;

  books[index].comments.push({ name: "Guest", comment: commentText });
  renderBooks();
};

renderBooks();
