import dotenv from 'dotenv';
import app from '../app';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect('mongodb://localhost/shoppingListTest', () => {
  console.log("Test Mongo is connected.")
});
const { expect } = chai;
chai.use(chaiHttp);
chai.should();


let getId, createdId, wrongId;

describe('Tests for items', () => {
  after(() => {/* eslint-disable-line */
    console.log("Tests all done...")
    mongoose.disconnect();
  });

  describe('GET api/v1/items', () => {
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .get('/api/v1/items')
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('array');
            getId = res.body[0]._id
            done();
          });
      }
    );
  })

  describe('GET api/v1/items/:id', () => {
    it(
      'should return a status 500',
      (done) => {
        chai
          .request(app)
          .get('/api/v1/items/7689o9')
          .end((err, res) => {
            expect(res).to.be.status(500);
            res.body.should.have.a('object');
            res.body.should.have
              .property('message')
              .to.equal('error with input type');
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .get(`/api/v1/items/${getId}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
              res.body.item[0].should.have
              .property('name')
              .to.equal('Oranges');
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        wrongId = getId.slice(1, -1) + 'ac'
        chai
          .request(app)
          .get(`/api/v1/items/${wrongId}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal('No such item');
            done();
          });
      }
    );
  })

  describe('POST api/v1/items', () => {
    it(
      'should return a status 201',
      (done) => {
        chai
          .request(app)
          .post('/api/v1/items')
          .send({
            groceryName: 'Plantain',
            groceryPrice: 150.00
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("Plantain has been added at &#8358;150");
              createdId = res.body.grocery._id
            done();
          });
      }
    );
  })

  describe('PATCH api/v1/items/:id', () => {
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/items/${wrongId}`)
          .send({
            groceryName: 'Plantain',
            groceryPrice: 170.00
          })
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/items/${wrongId}aa`)
          .send({
            groceryName: 'Plantain',
            groceryPrice: 170.00
          })
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/items/${createdId}`)
          .send({
            groceryName: 'Plantain',
            groceryPrice: 170.00
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The item has been updated");
            done();
          });
      }
    );
  })

  describe('PUT api/v1/items/:id', () => {
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .put(`/api/v1/items/${wrongId}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .put(`/api/v1/items/${wrongId}saa`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .put(`/api/v1/items/${createdId}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The item has been purchased");
            done();
          });
      }
    );
  })

  describe('DELETE api/v1/items/:id', () => {
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/items/${wrongId}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/items/${wrongId}fds`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such item");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/items/${createdId}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The item has been deleted.");
            done();
          });
      }
    );
  })
})
