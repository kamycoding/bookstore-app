function getBookInfoTemplate(book, index) {
  return /*html*/ `
    <h2 class="title is-4">${book.name}</h2>
    <p class="subtitle is-6">${book.author}</p>
    <p>Price: ${book.price} €</p>
    <button class="button is-light" type="button" onclick="toggleLike(${index})">
      ❤️ ${book.likes}
    </button>
  `;
}

function getCommentTemplate(comment) {
  return /*html*/ `
    <article class="box is-shadowless">
      <strong>${comment.name}</strong>
      <p>${comment.comment}</p>
    </article>
  `;
}

function getCommentsTemplate(comments) {
  if (comments.length === 0) {
    return `<p class="has-text-grey">No comments yet.</p>`;
  }

  return comments.map((comment) => getCommentTemplate(comment)).join("");
}

function getBookTemplate(book, index) {
  return /*html*/ `
    <div class="column is-one-third-desktop is-half-tablet">
      <article class="card">
        <div class="card-content">
          ${getBookInfoTemplate(book, index)}
          <hr />
          <h3 class="title is-6">Comments</h3>
          ${getCommentsTemplate(book.comments)}
        </div>
      </article>
    </div>
  `;
}
