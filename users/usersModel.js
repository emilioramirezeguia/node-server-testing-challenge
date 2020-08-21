const db = require("../data/dbConfig");

module.exports = {
  find,
  add,
  remove,
};

function find() {
  return db("users");
}

function add(user) {
  return db("users").insert(user, "id");
}

function remove(id) {
  return db("users").where({ id }).del();
}
