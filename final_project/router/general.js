const express = require('express');
let books = require("./booksdb.js");
const { default: axios } = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Todo 6: Register a user
public_users.post("/register", (req, res) => {
  // Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (isValid(username)) {
    return res.status(400).json({message: "User already exists"});
  }

  users.push({ username, password });
  res.status(201).json({message: "User registered successfully"});
});


// Todo 1: Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Write your code here
  // books ? res.send(JSON.stringify(books, null, 4)) : res.status(500).json({message: "No books found"});

  new Promise((resolve, reject) => books ? resolve(books) : reject("No books found"))
    .then((books) => res.send(JSON.stringify(books, null, 4)))
    .catch((err) => res.status(500).json({message: err}));
});

// Todo 10: Get the book list available in the shop using promises
public_users.get('/async',function (req, res) {
  // Write your code here
  axios.get('http://localhost:3000/')
    .then((response) => res.send(JSON.stringify(response.data, null, 4)))
    .catch((err) => res.status(500).json({message: err}));
});


// Todo 2: Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Write your code here
  const { isbn } = req.params;
  books[isbn] 
    ? res.status(200).json(books[isbn]) 
    : res.status(404).json({message: "Book not found"});
});

// Todo 11: Get book details based on ISBN using promises
public_users.get('/async/isbn/:isbn',function (req, res) {
  // Write your code here
  const { isbn } = req.params;
  axios.get(`http://localhost:3000/isbn/${isbn}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(404).json({message: "Book not found"}));
});


// Todo 3: Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Write your code here
  const { author } = req.params;
  const filteredBooks = Object.values(books).filter(book => book.author === author);
  filteredBooks.length > 0 
    ? res.status(200).json(filteredBooks) 
    : res.status(404).json({message: "No books found for the given author"});
});

// Todo 12: Get book details based on author using promises
public_users.get('/async/author/:author',function (req, res) {
  // Write your code here
  const { author } = req.params;
  axios.get(`http://localhost:3000/author/${author}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(404).json({message: "No books found for the given author"}));
});


// Todo 4: Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Write your code here
  const { title } = req.params;

  const filteredBooks = Object.values(books).filter(book => book.title === title);
  filteredBooks.length > 0 
    ? res.status(200).json(filteredBooks) 
    : res.status(404).json({message: "No books found for the given title"});
});

// Todo 13: Get all books based on title using promises
public_users.get('/async/title/:title',function (req, res) {
  // Write your code here
  const { title } = req.params;
  axios.get(`http://localhost:3000/title/${title}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(404).json({message: "No books found for the given title"}));
});


// Todo 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Write your code here
  const { isbn } = req.params;

  books[isbn] && books[isbn].reviews 
    ? res.status(200).json(books[isbn].reviews) 
    : res.status(404).json({message: "No reviews found for the given book"});
});

module.exports.general = public_users;
