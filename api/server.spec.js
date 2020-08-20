const supertest = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");
const Users = require("../users/usersModel");

describe("server", () => {
  describe("GET /", () => {
    it("should find a list of users", async () => {
      //Option 1
      //   return supertest(server)
      //     .get("/")
      //     .then((response) => {
      //       expect(response.status).toBe(200);
      //     });
      //Option 2
      //   supertest(server)
      //     .get("/")
      //     .then((response) => {
      //       expect(response.status).toBe(200);
      //       done();
      //     });
      //Option 3
      const response = await supertest(server).get("/");
      expect(response.status).toBe(200);
    });
  });
});
