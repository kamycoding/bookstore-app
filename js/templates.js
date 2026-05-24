function getBookInfoTemplate(book, index) {
  const likeButtonClass = book.liked ? "book-btn-liked" : "book-btn";

  return /*html*/ `
    <div class="book-cover-wrapper">
      <img class="book-cover-img" src="${book.image}" alt="${book.name}" loading="lazy" />
    </div>
    <h2 class="book-title">${book.name}</h2>
    <p class="book-author">${book.author}</p>
    <div class="book-meta">
      <span class="book-meta-item">${book.price} €</span>
      <span class="book-meta-divider">·</span>
      <span class="book-meta-item">${book.genre}</span>
      <span class="book-meta-divider">·</span>
      <span class="book-meta-item">${book.publishedYear}</span>
    </div>
    <button class="${likeButtonClass}" type="button" onclick="toggleLike(${index})">
      <span class="book-btn-icon">${book.liked ? "❤️" : "🤍"}</span>
      <span>${book.likes}</span>
    </button>
  `;
}

function getCommentTemplate(comment) {
  return /*html*/ `
    <div class="comment">
      <strong class="comment-name">${comment.name}</strong>
      <p class="comment-text">${comment.comment}</p>
    </div>
  `;
}

function getCommentsTemplate(comments) {
  if (comments.length === 0) {
    return `<p class="comments-empty">Noch keine Kommentare.</p>`;
  }

  return comments.map((comment) => getCommentTemplate(comment)).join("");
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
  return /*html*/ `
    <div class="book-column">
      <article class="book-card">
        <div class="book-card-body">
          ${getBookInfoTemplate(book, index)}
          <div class="book-comments-section">
            <h3 class="book-comments-heading">Kommentare</h3>
            ${getCommentsTemplate(book.comments)}
            ${getCommentFormTemplate(index)}
          </div>
        </div>
      </article>
    </div>
  `;
}
