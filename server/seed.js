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
      knex.destroy();
    });
});
//       .then(function () {
//         console.log('Created Users Table');
//         db.schema
//           .createTable('images', (table) => {
//             table.string('public_id').primary();
//             table.string('user_id').notNullable();
//             table.string('name').notNullable();
//             table.string('secure_url').notNullable();
//             table.string('visibility').notNullable();
//             table.timestamp('uploaded_on').defaultTo(db.fn.now());
//           })
//           .then(function () {
//             console.log('Created Images Table');
//           })
//           .then(function () {
//             knex.destroy();
//           });
//       });
//   });
// };

// createDb();
