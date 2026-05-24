const renderBooks = () => {
  const bookList = document.getElementById("bookList");
  const firstBook = books[0];
  bookList.innerHTML = `
   <h2>${firstBook.name}</h2>
   <p>${firstBook.author}</p>
`;
};

renderBooks();
