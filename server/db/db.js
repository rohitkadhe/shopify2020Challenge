require('dotenv').config();

let knex = require('knex');
// var conn = {
//   host: '127.0.0.1',
//   user: 'postgres',
//   password: 'root',
//   charset: 'utf8',
//   database: 'shopifyimagerepository',
// };
knex = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});
module.exports = knex;
