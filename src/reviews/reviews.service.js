const { response } = require("../app");
const knex = require("../db/connection");
const addCritic = require("../utils/mapCritic");

function read(review_id) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": review_id })
    .first();
}

function destroy(review_id) {
  return knex("reviews as r").where({ "r.review_id": review_id }).del("*");
}

function getCritic(critic_id) {
  return knex("critics as c").select("*").where({ "c.critic_id": critic_id });
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": updatedReview.review_id })
    .update({ ...updatedReview })
    .returning("*");
}

module.exports = {
  read,
  delete: destroy,
  update,
  getCritic,
};
