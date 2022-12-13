const Sequelize = require("sequelize");
const config = {};

// ADD CONFIGURATIONS HERE
if (process.env.QUIET) {
  config.logging = false;
}

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/style_genie_draft",
  config
);

module.exports = conn;
