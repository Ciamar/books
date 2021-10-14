process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/Book');

let server = require('../server');
const assert = require('assert');
const clear = require('./test_helper');

var should = require('chai').should();

describe('Books', () => {

  clear();

  describe('create books', () => {
      it('it should create a book', (done) => {

        let book = new Book({
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            isbn: "234554"
        });

        book.save()
            .then(() => {
                assert(!book.isNew);
                done();
            });
      });
  });

  describe('Get books', () => {
    it('it should get books', (done) => {

      Book.find()
          .then(books => {
            books.should.be.a('array');
            done();
          })
    })
  })


});
