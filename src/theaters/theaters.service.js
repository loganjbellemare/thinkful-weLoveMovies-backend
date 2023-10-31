const knex = require("../db/connection");

function list() {
  return knex("theaters as t").select("*");
}

function listMovies(theater_id) {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .where("mt.theater_id", theater_id)
    .distinct("m.movie_id")
    .select("m.*", "mt.*");
}

module.exports = {
  list,
  listMovies,
};
