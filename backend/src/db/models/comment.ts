import * as Knex from 'knex';

class DAO {
  private db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  async create(data) {
    const comments = await this.db('comments')
      .returning(['id', 'content', 'idUser', 'idPost', 'createdAt'])
      .insert(data);
    return comments[0];
  }

  update(data) {}

  async get({ idPost }) {
    if (!idPost) return null;
    return await this.db('comments').where('comments.idPost', idPost);
  }

  async remove({ id }) {
    await this.db('comments').where('comments.id', id);
  }
}

const name = 'Comment';
export { name, DAO };
