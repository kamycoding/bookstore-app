const STORAGE_KEY = "buchfinderBooks";

const bookList = document.getElementById("bookList");
const typewriterElement = document.getElementById("typewriter");
const navSearchLink = document.getElementById("navSearchLink");
const searchInput = document.querySelector(".hero-search-input");
const heroSearchForm = document.getElementById("heroSearch");
const favoritesFilterButton = document.getElementById("favoritesFilterButton");

const typewriterPhrases = [
  "nächstes Buch",
  "neues Lieblingsbuch",
  "nächstes Abenteuer",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const cloneBooks = (sourceBooks) => {
  return JSON.parse(JSON.stringify(sourceBooks));
};

const isValidStoredBooks = (storedBooks) => {
  return Array.isArray(storedBooks) && storedBooks.length === books.length;
};

const loadStoredBooks = () => {
  try {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    if (!storedBooks) return cloneBooks(books);
    const parsedBooks = JSON.parse(storedBooks);
    return isValidStoredBooks(parsedBooks) ? parsedBooks : cloneBooks(books);
  } catch {
    return cloneBooks(books);
  }
};

let appBooks = loadStoredBooks();
let showOnlyFavorites = false;

const getAllBookEntries = () => {
  return appBooks.map((book, index) => ({ book, index }));
};

const saveBooks = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appBooks));
};

const renderEmptyState = () => {
  bookList.innerHTML = `
    <p class="empty-state">Keine Bücher gefunden.</p>
  `;
};

const getVisibleBookEntries = () => {
  const searchTerm = getNormalizedSearchTerm();
  let entries = getAllBookEntries();

  if (searchTerm !== "") {
    entries = filterEntriesBySearch(entries, searchTerm);
  }
  if (showOnlyFavorites) entries = filterFavoriteEntries(entries);

  return entries;
};

const renderBooks = () => {
  const visibleBookEntries = getVisibleBookEntries();

  if (visibleBookEntries.length === 0) {
    renderEmptyState();
    return;
  }

  renderBookEntries(visibleBookEntries);
};

const toggleLike = (index) => {
  const book = appBooks[index];

  book.liked = !book.liked;
  book.likes += book.liked ? 1 : -1;

  saveBooks();
  renderBooks();
};

const createGuestComment = (commentText) => {
  return {
    name: "Gast",
    avatar: "./img/avatars/gast.svg",
    comment: commentText,
  };
};

const addComment = (event, index) => {
  event.preventDefault();

  const commentInput = event.target.elements.comment;
  const commentText = commentInput.value.trim();

  if (commentText === "") return;

  appBooks[index].comments.push(createGuestComment(commentText));
  saveBooks();
  renderBooks();
};

const getCurrentPhrase = () => typewriterPhrases[phraseIndex];

const updateTypewriterText = () => {
  const textElement = typewriterElement?.querySelector(".typewriter-text");
  if (!textElement) return;

  const currentPhrase = getCurrentPhrase();
  const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  textElement.textContent = currentPhrase.substring(0, nextIndex);
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
  if (!typewriterElement?.querySelector(".typewriter-text")) return;

  updateTypewriterText();

  const delay = getTypewriterDelay();

  updateTypewriterState();

  setTimeout(typewriterEffect, delay);
};

typewriterEffect();

const focusHeroSearch = (event) => {
  event.preventDefault();

  if (!searchInput) return;

  searchInput.closest(".hero-section")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => searchInput.focus(), 500);
};

navSearchLink?.addEventListener("click", focusHeroSearch);

const getNormalizedSearchTerm = () => {
  if (!searchInput) return "";
  return searchInput.value.trim().toLowerCase();
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

const filterEntriesBySearch = (bookEntries, searchTerm) => {
  return bookEntries.filter((entry) => {
    return doesBookMatchSearch(entry.book, searchTerm);
  });
};

const filterFavoriteEntries = (bookEntries) => {
  return bookEntries.filter((entry) => entry.book.liked);
};

const renderBookEntries = (bookEntries) => {
  const booksHtml = bookEntries
    .map((entry) => getBookTemplate(entry.book, entry.index))
    .join("");
  bookList.innerHTML = booksHtml;
};

const handleSearch = () => {
  renderBooks();
};

const updateFavoritesButtonText = () => {
  if (!favoritesFilterButton) return;

  favoritesFilterButton.textContent = showOnlyFavorites
    ? "Alle Bücher anzeigen"
    : "Nur Favoriten anzeigen";
};

const toggleFavoritesFilter = () => {
  showOnlyFavorites = !showOnlyFavorites;
  updateFavoritesButtonText();
  renderBooks();
};

renderBooks();
updateFavoritesButtonText();

heroSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

favoritesFilterButton?.addEventListener("click", toggleFavoritesFilter);

searchInput?.addEventListener("input", () => {
  handleSearch();
});
