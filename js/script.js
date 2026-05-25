const renderBooks = () => {
  const bookList = document.getElementById("bookList");
  const searchTerm = getNormalizedSearchTerm();

  if (searchTerm === "") {
    const booksHtml = books
      .map((book, index) => getBookTemplate(book, index))
      .join("");
    bookList.innerHTML = booksHtml;
    return;
  }

  const filteredEntries = getFilteredBookEntries(searchTerm);

  if (filteredEntries.length === 0) {
    bookList.innerHTML = `<p class="empty-state">Keine Bücher gefunden.</p>`;
    return;
  }

  renderBookEntries(filteredEntries);
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

  books[index].comments.push({
    name: "Gast",
    avatar: "./img/avatars/gast.svg",
    comment: commentText,
  });
  renderBooks();
};

renderBooks();

/* ─── Typewriter Effect ─── */
const typewriterElement = document.querySelector("#typewriter .typewriter-text");
const typewriterPhrases = ["nächstes Buch", "neues Lieblingsbuch", "nächstes Abenteuer"];

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

/* ─── Search / Filter ─── */
const getSearchInput = () => document.querySelector(".hero-search-input");

const getNormalizedSearchTerm = () => {
  const input = getSearchInput();
  if (!input) return "";
  return input.value.trim().toLowerCase();
};

const doesBookMatchSearch = (book, searchTerm) => {
  const name = book.name.toLowerCase();
  const author = book.author.toLowerCase();
  const genre = book.genre.toLowerCase();
  return (
    name.includes(searchTerm) ||
    author.includes(searchTerm) ||
    genre.includes(searchTerm)
  );
};

const getFilteredBookEntries = (searchTerm) => {
  return books
    .map((book, index) => ({ book, index }))
    .filter((entry) => doesBookMatchSearch(entry.book, searchTerm));
};

const renderBookEntries = (bookEntries) => {
  const bookList = document.getElementById("bookList");
  const booksHtml = bookEntries
    .map((entry) => getBookTemplate(entry.book, entry.index))
    .join("");
  bookList.innerHTML = booksHtml;
};

const handleSearch = () => {
  renderBooks();
};

document.getElementById("heroSearch")?.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch();
});

document.querySelector(".hero-search-button")?.addEventListener("click", () => {
  handleSearch();
});

getSearchInput()?.addEventListener("input", () => {
  handleSearch();
});
