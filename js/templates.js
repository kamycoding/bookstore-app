function getBookTemplate(book, index) {
  return /*html*/ `
    <div class="column is-one-third-desktop is-half-tablet">
      <article class="card">
        <div class="card-content">
          <h2 class="title is-4">${book.name}</h2>
          <p class="subtitle is-6">${book.author}</p>
          <p>Price: ${book.price} €</p>

          <button class="button is-light" type="button" onclick="toggleLike(${index})">
            ❤️ ${book.likes}
          </button>
        </div>
      </article>
    </div>
  `;
}
