const express = require("express");
const db = require("../data/dbConfig");
const Users = require("../users/usersModel");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = server;
