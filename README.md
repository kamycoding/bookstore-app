# Buchfinder

Buchfinder is a small frontend-only bookstore app built with **HTML**, **CSS** and **Vanilla JavaScript**.

The project renders books dynamically from a JavaScript array and includes interactive features like likes, comments, search, favorites filtering and localStorage persistence.

---

## Live Demo

**Live Version:**  
https://kamycoding.github.io/bookstore-app/

**GitHub Repository:**  
https://github.com/kamycoding/bookstore-app

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## Features

- Dynamic book rendering from a JavaScript array
- Like and dislike functionality
- Heart icon changes based on liked state
- Comment section for each book
- Comment avatars
- Search by title, author and genre
- Favorites filter
- Empty state for search results
- Persistent likes and comments with localStorage
- Responsive layout down to small mobile screens
- Custom dark/purple UI design
- Typewriter hero effect
- Favicon support
- No external framework

---

## Project Structure

```txt
bookstore-app/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── books.js
│   ├── templates.js
│   └── script.js
└── img/
    ├── books/
    ├── avatars/
    └── favicons/
```

## How It Works

The app uses a simple data-driven structure.

Book data is stored in `books.js`.
HTML templates are separated into `templates.js`.
The main application logic is handled in `script.js`.

The books are rendered dynamically into the page. When a user likes a book or adds a comment, the data is updated and saved in localStorage, so the changes stay available after refreshing the page.

## Author

Built by Kamycoding

GitHub: https://github.com/kamycoding
