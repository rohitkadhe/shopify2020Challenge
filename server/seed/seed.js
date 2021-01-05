require('dotenv').config();
let db = require('../db/db');

const createUsersTable = async () => {
  await db.schema.createTable('users', (table) => {
    table.increments('id').primary().unsigned();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.timestamp('joined_on').defaultTo(db.fn.now());
  });
};

const createImagesTable = async () => {
  await db.schema.createTable('images', (table) => {
    table.string('public_id').primary();
    table.string('user_id').notNullable();
    table.string('name').notNullable();
    table.string('secure_url').notNullable();
    table.string('visibility').notNullable();
    table.timestamp('uploaded_on').defaultTo(db.fn.now());
  });
};

module.exports = { createUsersTable, createImagesTable };
