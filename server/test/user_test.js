process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/User');
let Book = require('../models/Book');
const chai = require('chai');
const chaiHttp = require('chai-http');

let app = require('../app');
let server = app.server;
const assert = require('assert');

var expect = chai.expect;


chai.use(chaiHttp);
describe('Users', () => {

  describe('create users', () => {
      it('it should create a new user', (done) => {

        let user = {
            username: "someone2",
            email: "aa@a",
            password: "1234"
        };

        chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.user.username).to.equal(user.username);
              expect(res.body.user.email).to.equal(user.email.toLowerCase());
              done();
            });

        });

      it('it should not create a repeated user', (done) => {

        let user = {
            username: "someone2",
            email: "a@a",
            password: "1234"
        };

        chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
              expect(res.body.message).to.equal("Username or email has already been taken");
              done();
            });

      });

      it('it should not create a user without email', (done) => {

        let user = {
            username: "someeeone2",
            password: "1234"
        };

        chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
              expect(res.body).to.have.property("error");
              done();
            });

      });
  });

  describe('Login', () => {

    it('it should login', (done) => {
      let user = {
          username: "someone",
          email: "a@a",
          password: "1234"
      };

      chai.request(server)
          .post('/login')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal("Success");
            expect(res.body).to.have.property("token");
            done();
          });


    })

    it('it should fail with incorrect password', (done) => {
      let user = {
          username: "someone",
          email: "a@a",
          password: "12345"
      };

      chai.request(server)
          .post('/login')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal("Invalid useranme or password");
            done();
          });

    })

  })
});
