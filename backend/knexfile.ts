import { dbDatabase, dbUser, dbPassword } from './src/config';

console.log('pass', dbDatabase)

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: dbDatabase,
      user: dbUser,
      password: dbPassword,
    },
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
  },
};
