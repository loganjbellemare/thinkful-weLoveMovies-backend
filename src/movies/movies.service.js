const knex = require("../db/connection");
const mapCritic = require("../utils/mapCritic");

function listAll() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .distinct("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true });
}

function read(movie_id) {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movie_id })
    .first();
}

function readTheaters(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing as is_showing", "mt.movie_id as movie_id")
    .where({ "mt.movie_id": movie_id });
}

function readReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then((response) => mapCritic(response));
}

module.exports = {
  list: listAll,
  listIsShowing,
  read,
  readTheaters,
  readReviews,
};
