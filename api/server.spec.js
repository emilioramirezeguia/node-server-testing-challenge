const supertest = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");
const Users = require("../users/usersModel");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("GET /", () => {
    it("should return 200 OK", async () => {
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

  describe.only("POST /", () => {
    it("should return 201 Created with users", async () => {
      const response = await supertest(server).post("/").send({ name: "Gaby" });
      expect(response.status).toBe(201);
    });

    it("should add users", () => {
      return supertest(server)
        .post("/")
        .send({ name: "Test" })
        .then((response) => {
          console.log(response.body);
          //   expect(response).toBeInstanceOf(Array);
          expect(response.body.ids).toHaveLength(1);
        });
    });
  });
});
