const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const getBooksAsync = () => Promise.resolve(books);

const getBookByIsbnAsync = (isbn) =>
  new Promise((resolve, reject) => {
    const book = books[isbn];
    if (!book) {
      reject(new Error('Book not found'));
    } else {
      resolve(book);
    }
  });

const getBooksByAuthorAsync = (author) =>
  new Promise((resolve, reject) => {
    const authorLower = author.toLowerCase();
    const matchingBooks = Object.keys(books)
      .filter((isbn) => books[isbn].author.toLowerCase() === authorLower)
      .map((isbn) => ({ isbn, ...books[isbn] }));

    if (matchingBooks.length === 0) {
      reject(new Error('No books found for the given author'));
    } else {
      resolve(matchingBooks);
    }
  });

const getBooksByTitleAsync = (title) =>
  new Promise((resolve, reject) => {
    const titleLower = title.toLowerCase();
    const matchingBooks = Object.keys(books)
      .filter((isbn) => books[isbn].title.toLowerCase() === titleLower)
      .map((isbn) => ({ isbn, ...books[isbn] }));

    if (matchingBooks.length === 0) {
      reject(new Error('No books found for the given title'));
    } else {
      resolve(matchingBooks);
    }
  });


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getBooksAsync()
    .then((bookList) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify(bookList, null, 2));
    })
    .catch(() => {
      return res.status(500).json({ message: "Unable to fetch book list" });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const { isbn } = req.params;

  getBookByIsbnAsync(isbn)
    .then((book) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify(book, null, 2));
    })
    .catch((err) => {
      return res.status(404).json({ message: err.message });
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const { author } = req.params;

  getBooksByAuthorAsync(author)
    .then((matchingBooks) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify(matchingBooks, null, 2));
    })
    .catch((err) => {
      return res.status(404).json({ message: err.message });
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const { title } = req.params;

  getBooksByTitleAsync(title)
    .then((matchingBooks) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify(matchingBooks, null, 2));
    })
    .catch((err) => {
      return res.status(404).json({ message: err.message });
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!Array.isArray(book.reviews)) {
    book.reviews = Object.entries(book.reviews || {}).map(([key, value]) => ({
      id: key,
      username: key,
      review: value,
    }));
  }

  const reviews = book.reviews;

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).send(
    JSON.stringify(
      {
        isbn,
        title: book.title,
        author: book.author,
        reviews,
      },
      null,
      2
    )
  );
});

module.exports.general = public_users;
