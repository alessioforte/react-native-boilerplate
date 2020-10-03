import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { port } from './config';
import logger from './logger';
import resolvers from './resolvers';
import createContext from './context';
import typeDefs from './schema';
import { httpLogger } from './middlewares';

const app: any = express();

app.use(httpLogger);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

server.applyMiddleware({ app, path: '/' })

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});