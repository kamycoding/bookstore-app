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

/* ─── Typewriter Effect ─── */
const typewriterElement = document.getElementById("typewriter");

const typewriterPhrases = ["next read", "favorite book", "new adventure"];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typewriterEffect() {
  const currentPhrase = typewriterPhrases[phraseIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    delay = 500;
  }

  typewriterTimeout = setTimeout(typewriterEffect, delay);
}

typewriterEffect();
