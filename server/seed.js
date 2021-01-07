let User = require('./models/User');
let imageTableSeedDat = require('./seedData/imagesTable');
let Image = require('./models/Image');
let AuthService = require('./services/AuthService');
var conn = {
  host: '127.0.0.1',
  user: 'postgres',
  password: 'root',
  charset: 'utf8',
};
// connect without database selected
var knex = require('knex')({ client: 'pg', connection: conn });

knex.raw('CREATE DATABASE shopifyimagerepository').then(function () {
  knex.destroy();

  // connect with database selected
  conn.database = 'shopifyimagerepository';
  knex = require('knex')({ client: 'pg', connection: conn });

  knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary().unsigned();
      table.string('email').unique().notNullable();
      table.string('name').notNullable();
      table.string('password').notNullable();
      table.timestamp('joined_on').defaultTo(knex.fn.now());
    })
    .createTable('images', (table) => {
      table.string('public_id').primary();
      table.string('user_id').notNullable();
      table.string('name').notNullable();
      table.string('secure_url').notNullable();
      table.string('visibility').notNullable();
      table.timestamp('uploaded_on').defaultTo(knex.fn.now());
    })
    .then(function () {
      AuthService.hashPassword('seed')
        .then(function (res) {
          let user = new User('seed@gmail.com', 'Seed User', res);
          knex('users')
            .insert(user)
            .then(function () {
              return;
            });
          return;
        })
        .then(() =>
          Promise.all(
            imageTableSeedDat.map((image) => {
              let img = new Image(
                image.name,
                image.public_id,
                image.user_id,
                image.secure_url,
                image.visibility,
              );
              let res = knex('images').insert(img);

              return res;
            }),
          ).then(() => knex.destroy()),
        );
    });
});
