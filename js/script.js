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

const getCurrentPhrase = () => typewriterPhrases[phraseIndex];

const updateTypewriterText = () => {
  const currentPhrase = getCurrentPhrase();
  const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  typewriterElement.textContent = currentPhrase.substring(0, nextIndex);
  charIndex = nextIndex;
};

const getTypewriterDelay = () => {
  const currentPhrase = getCurrentPhrase();

  if (!isDeleting && charIndex === currentPhrase.length) return 1800;
  if (isDeleting && charIndex === 0) return 600;

  return isDeleting ? 120 : 160;
};

const updateTypewriterState = () => {
  const currentPhrase = getCurrentPhrase();

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
  }
};

const typewriterEffect = () => {
  if (!typewriterElement) return;

  updateTypewriterText();

  const delay = getTypewriterDelay();

  updateTypewriterState();

  setTimeout(typewriterEffect, delay);
};

typewriterEffect();

document.getElementById("navSearchLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector(".hero-search-input");
  if (searchInput) {
    searchInput.closest(".hero-section")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => searchInput.focus(), 500);
  }
});
