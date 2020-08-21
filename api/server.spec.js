const supertest = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");
const Users = require("../users/usersModel");

describe("server", () => {
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

  describe("POST /", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
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

  describe("DELETE /", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it.only("should return 204 No Content", async () => {
      await supertest(server).post("/").send({ name: "Kyle" });
      const users = await db("users");
      expect(users[0]).toHaveProperty("name", "Kyle");
      const response = await supertest(server).delete("/1");
      expect(response.status).toBe(204);
      const noUsers = await db("users");
      expect(noUsers).toHaveLength(0);
    });
  });
});
