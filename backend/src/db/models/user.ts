import * as Knex from 'knex';

class DAO {
  private db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  async create(data) {
    const user = await this.db('users')
    .returning([
      'id',
      'firstname',
      'lastname',
      'email',
      'createdAt'
    ])
    .insert(data);
    return user[0];
  }

  update(data) {}

  async get({ id, email }) {
    const users = this.db('users');
    let user: any[] = [];
    if (id) {
      user = await users.where('id', id);
    } else if (email) {
      user = await users.where('email', email);
    }
    return Array.isArray(user) && user.length > 0 ? user[0] : null;
  }
}

const name = 'User';
export { name, DAO };
