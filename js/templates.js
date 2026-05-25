function getLikeIcon(liked) {
  if (liked) {
    return /*html*/ `
      <svg class="book-like-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
        />
      </svg>
    `;
  }

  return /*html*/ `
    <svg class="book-like-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        fill="currentColor"
      />
    </svg>
  `;
}

function getCommentTemplate(comment) {
  return /*html*/ `
    <li class="comment">
      <img
        class="comment-avatar"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="32"
        height="32"
        loading="lazy"
      />
      <div class="comment-content">
        <span class="comment-name">${comment.name}</span>
        <p class="comment-text">${comment.comment}</p>
      </div>
    </li>
  `;
}

function getCommentsTemplate(comments) {
  if (comments.length === 0) {
    return `<p class="comments-empty">Noch keine Kommentare.</p>`;
  }

  return `<ul class="comments-list">${comments.map((comment) => getCommentTemplate(comment)).join("")}</ul>`;
}

function getCommentFormTemplate(index) {
  return /*html*/ `
    <form class="comment-form" onsubmit="addComment(event, ${index})">
      <input class="comment-input" name="comment" placeholder="Kommentar schreiben..." />
      <button class="comment-submit" type="submit">Senden</button>
    </form>
  `;
}

function getBookTemplate(book, index) {
  const likeButtonClass = book.liked
    ? "book-like-btn book-like-btn--active"
    : "book-like-btn";

  return /*html*/ `
    <article class="book-card">
      <div class="book-cover">
        <img class="book-cover-img" src="${book.image}" alt="${book.name}" loading="lazy" />
      </div>

      <div class="book-details">
        <div class="book-info-main">
          <h2 class="book-title">${book.name}</h2>
          <div class="book-subline">
            <p class="book-author">${book.author}</p>
            <p class="book-meta">${book.genre} · ${book.publishedYear}</p>
          </div>
        </div>

        <div class="book-actions">
          <button
            class="${likeButtonClass}"
            type="button"
            onclick="toggleLike(${index})"
            aria-label="${book.liked ? "Like entfernen" : "Like hinzufügen"}"
          >
            ${getLikeIcon(book.liked)}
            <span class="book-like-count">${book.likes}</span>
          </button>
          <span class="book-price">${book.price} €</span>
        </div>
      </div>

      <section class="book-comments" aria-label="Kommentare zu ${book.name}">
        <h3 class="book-comments-heading">Kommentare</h3>
        <div class="comments-body">
          ${getCommentsTemplate(book.comments)}
        </div>
        ${getCommentFormTemplate(index)}
      </section>
    </article>
  `;
}
