import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })

    .createTable('posts', (table) => {
      table.increments('id').primary();
      table
        .integer('idUser')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
      table.string('title');
      table.string('content');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })

    .createTable('comments', (table) => {
      table.increments('id').primary();
      table
        .integer('idPost')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .index();
      table
        .integer('idUser')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
      table.string('title');
      table.string('content');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })

    .createTable('likes', (table) => {
      table
        .integer('idPost')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .index();
      table
        .integer('idUser')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
      table
        .integer('idComment')
        .unsigned()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')
        .index();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('likes')
    .dropTable('comments')
    .dropTable('posts')
    .dropTable('users')
}
