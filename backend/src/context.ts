import { verifyToken } from './utils/auth';
import db, { models } from './db';

function createContext(ctx) {
  const authorization = ctx.req.get('Authorization');
  let user = null
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    user = verifyToken(token);
  }

  return {
    ...ctx,
    db,
    models,
    user,
  };
}

export default createContext;
