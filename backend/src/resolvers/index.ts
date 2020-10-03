import { compare, hash } from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from '../utils/auth';
import { validateLoginInput, validateRegisterInput } from '../utils/validators';

const resolvers = {
  Query: {
    test: async (parent, { id }, ctx, info) => {
      return 'ok'
    },
    user: async (parent, { id }, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      return await ctx.models.User.get({ id: user.id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { models }, info) => {
      try {
        const { valid, errors } = validateLoginInput({ email, password });
        if (!valid) {
          throw new UserInputError('Error', { errors });
        }
        const user = await models.User.get({ email });
        if (!user) {
          throw new UserInputError(`No user found for email: ${email}`);
        }

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new UserInputError('Invalid password');
        }
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        return {
          accessToken,
          refreshToken,
          expiresIn: 3600,
        };
      } catch (err) {
        return err;
      }
    },
    register: async (parent, data, ctx, info) => {
      const { models } = ctx;
      const { valid, errors } = validateRegisterInput(data);
      if (!valid) {
        throw new UserInputError('Error', { errors });
      }
      const { firstname, lastname, username, email, password } = data;
      const exists = await models.User.get({ email });
      console.log(exists);
      if (exists) {
        throw new UserInputError(`User with email ${email} already exists.`);
      }

      const hashedPassword = await hash(password, 10);

      await models.User.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
      });

      const accessToken = createAccessToken(data);
      const refreshToken = createRefreshToken(data);
      return {
        accessToken,
        refreshToken,
        expiresIn: 3600,
      };
    },
    createPost: async (parent, data, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      return await ctx.models.Post.create(data);
    },
    post: async (parent, { id }, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      const post = await ctx.models.Post.getOne({ id })
      const comments = await ctx.models.Comment.get({ idPost: id })
      const likes = await ctx.models.Like.get({ idPost: id });
      return {
        ...post,
        comments,
        likes
      }
    },
    posts: async (parent, data, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      const posts = await ctx.models.Post.get({ idUser: user.id });
      return posts;
    },
    deletePost: async (parent, data, ctx, info) => {},
    createComment: async (parent, data, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      return await ctx.models.Comment.create(data);
    },
    deleteComment: async (parent, data, ctx, info) => {},
    addLike: async (parent, data, ctx, info) => {
      const { user } = ctx;
      if (!user) throw Error('No authorization');
      return await ctx.models.Like.add(data);
    },
    deleteLike: async (parent, data, ctx, info) => {},
  },
};

export default resolvers;
