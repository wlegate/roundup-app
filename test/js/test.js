const expect = require('expect');
const request = require('supertest');
// Start server
const app = require('../../');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', done => {
        request(HOST)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  });
});
