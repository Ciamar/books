const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  read: {
    type: Boolean
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  published_date: {
    type: Date
  },
  publisher: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  pages: {
    type: Number
  },
  isbn: {
    type: String
  },
  cover: {
    type: String
  }

});

module.exports = Book = mongoose.model('book', BookSchema);
