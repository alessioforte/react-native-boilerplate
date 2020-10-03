import fs from 'fs'
import path from 'path'
import * as config from '../config'
import * as Knex from "knex";
import logger from '../logger';


// import bookshelf from 'bookshelf';
// const orm = bookshelf(db)
// const User = orm.model('User', {
//   tableName: 'users',
// })
// const Post = orm.model('Post', {
//   tableName: 'posts',
// })
// const Comment = orm.model('Comment', {
//   tableName: 'comments'
// })
// const Like = orm.model('Like', {
//   tableName: 'likes'
// })

const {
  dbHost: host,
  dbDatabase: database,
  dbUser: user,
  dbPassword: password,
} = config;

let models: any;

function connect(): any {
  try {
    const db = Knex.default({
      client: 'pg',
      connection: {
        host,
        user,
        password,
        database
      }
    })

    models = fs.readdirSync(path.join(__dirname, 'models')).filter(file => {
      return file.indexOf('.') !== 0 && file.slice(-3) === '.ts';
    })
    .reduce((models, file) => {
      const { name, DAO } = require(path.join(`${__dirname}/models`, file));

      return {
        ...models,
        [name]: new DAO(db),
      };
    }, {});

    logger.info(`DB Connected`)
    return db;
  } catch (err) {
    logger.error(`DB Error: ${err}`)
  }
}

export default connect();
export { models }
