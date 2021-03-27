const knex = require("../config/knex");

knex.schema.hasTable("employees").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("employees", function (table) {
        table.increments();
        table.string("first_name", 100);
        table.string("last_name", 100);
        table.string("phone", 10);
        table.string("email");
        table.string("company");
        table.timestamp("created_at").defaultTo(knex.raw("now()"));
      })
      .finally(function (queryResult) {
        knex.destroy();
        return queryResult;
      });
  }
});
