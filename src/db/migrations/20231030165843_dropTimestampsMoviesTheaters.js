exports.up = function (knex) {
  return knex.schema.alterTable("movies_theaters", (table) => {
    table.dropTimestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("movies_theaters", (table) => {
    table.timestamps(true, true);
  });
};
