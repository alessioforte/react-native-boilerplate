import * as Knex from 'knex';

class DAO {
  private db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  async create(data) {
    const posts = await this.db('posts')
      .returning(['id', 'title', 'content', 'idUser', 'createdAt'])
      .insert(data);
    return posts[0];
  }

  update(data) {}

  async get({ idUser }) {
    if (!idUser) return null;
    const posts = await this.db.raw(`
      select
        "posts"."id",
        "posts"."idUser",
        "posts"."title",
        "posts"."content",
        "posts"."createdAt",
        COUNT(DISTINCT "comments"."id") AS "countComments",
        COUNT(DISTINCT "likes"."idUser") AS "countLikes"
      from posts
      left join comments on posts.id = "comments"."idPost"
      left join likes on (posts.id = "likes"."idPost" AND "likes"."idComment" IS NULL)
      where "posts"."idUser"=1
      GROUP BY "posts"."id";
    `);
    console.log(posts);
    return posts.rows;
  }

  async getOne({ id }) {
    const post = await this.db('posts').where('id', id);
    return Array.isArray(post) && post.length > 0 ? post[0] : null;
  }

  async remove({ id }) {
    await this.db('posts').where('id', id).del();
  }
}

const name = 'Post';
export { name, DAO };
