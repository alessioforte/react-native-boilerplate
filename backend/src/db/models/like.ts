import * as Knex from 'knex';

class DAO {
  private db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  async add(data) {
    const exists = this.getOne(data);
    if (exists) return null;
    const likes = await this.db('likes')
      .returning(['idPost', 'idComment', 'idUser', 'createdAt'])
      .insert(data);
    return likes[0];
  }

  async remove({ idPost, idUser, idComment }) {
    await this.db('likes')
      .where('iPost', idPost)
      .andWhere('idUser', idUser)
      .andWhere('idComment', idComment)
      .del();
  }

  async getOne({ idPost, idUser, idComment }) {
    const like = await this.db('likes')
      .where('iPost', idPost)
      .andWhere('idUser', idUser)
      .andWhere('idComment', idComment);
    console.log(like);
    return like;
  }

  async get({ idPost }) {
    if (!idPost) return null;
    const likes = await this.db('likes')
      .select('*')
      .where('likes.idPost', idPost);
    return likes;
  }
}

const name = 'Like';
export { name, DAO };
