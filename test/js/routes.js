const expect = require("expect");
const request = require("supertest");
// Start server
const app = require("../../server.js");

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

describe("Route integration", () => {
  describe("/accounts", () => {
    describe("GET", () => {
      xit("returns an account", done => {
        request(HOST)
          .get("/accounts")
          .expect(false)
          .end((err) => {
            done();
          });
      });
    });
  });
  describe("/register", () => {
    describe("POST", () => {
      xit("registers an account", done => {
        request(HOST)
          .post("/register")
          .send({
            email: "tester@testing.com",
            password: "password123"
          })
          .end((err, result) => {
            console.log(result);
            expect(typeof result.data.session).toEqual("string");
            done();
          });
      });
    });
  });
});
