const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  if (!username) {
    return false;
  }

  return users.some((user) => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  if (!username || !password) {
    return false;
  }

  return users.some((user) => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  const accessToken = jwt.sign({ username }, "access", { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken, username };

  return res.status(200).json({ message: "User successfully logged in" });
});

// Add a book review
regd_users.post("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.body.username || req.query.username;
  const review = req.body.review || req.query.review;

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

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

  const reviewId = req.body.reviewId || req.query.reviewId;

  if (reviewId) {
    const existingReview = book.reviews.find((entry) => entry.id === reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    existingReview.review = review;

    if (username) {
      existingReview.username = username;
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(
      JSON.stringify(
        {
          message: "Review successfully updated",
          isbn,
          reviews: book.reviews,
        },
        null,
        2
      )
    );
  }

  const newReview = {
    id: `${Date.now()}`,
    review,
  };

  if (username) {
    newReview.username = username;
  }

  book.reviews.push(newReview);

  res.setHeader('Content-Type', 'application/json');
  return res.status(201).send(
    JSON.stringify(
      {
        message: "Review successfully posted",
        isbn,
        reviews: book.reviews,
      },
      null,
      2
    )
  );
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
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

  const reviewId = req.body.reviewId || req.query.reviewId;

  if (!reviewId) {
    return res.status(400).json({ message: "Review ID is required" });
  }

  const reviewIndex = book.reviews.findIndex((entry) => entry.id === reviewId);

  if (reviewIndex === -1) {
    return res.status(404).json({ message: "Review not found" });
  }

  const review = book.reviews[reviewIndex];
  const sessionUser = req.user && req.user.username;

  if (review.username && sessionUser && review.username !== sessionUser) {
    return res.status(403).json({ message: "You can only delete your own review" });
  }

  book.reviews.splice(reviewIndex, 1);

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).send(
    JSON.stringify(
      {
        message: "Review successfully deleted",
        isbn,
        reviews: book.reviews,
      },
      null,
      2
    )
  );
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
