require('dotenv').config();

let knex = require('knex');
knex = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});
module.exports = knex;
