import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    user: User!
    test: String
  }

  type Mutation {
    login(
      email: String,
      password: String
    ): Authorization
    register(
      firstname: String,
      lastname: String,
      username: String,
      email: String,
      password: String
    ): Authorization

    createPost(
      idUser: Int,
      title: String,
      content: String
    ): Post

    post(
      id: Int
    ): Post

    posts(
      idUser: Int
    ): [Post]

    deletePost(
      idPost: Int
    ): Post

    createComment(
      idUser: Int,
      idPost: Int,
      content: String
    ): Comment

    deleteComment(
      idComment: Int
    ): Comment

    addLike(
      idUser: Int,
      idPost: Int,
      idComment: Int
    ): Like
    deleteLike(
      idUser: Int,
      idPost: Int,
      idComment: Int
    ): Like
  }

  type Authorization {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    firstname: String!
    lastname: String!
    email: String!
    createdAt: String
  }

  type Comment {
    id: ID!
    content: String!
    idUser: Int!
    idPost: Int!
    createdAt: String
  }

  type Like {
    idPost: Int!
    idComment: Int
    idUser: Int!
    createdAt: String
  }

  type Post {
    id: ID
    title: String
    content: String
    idUser: Int
    countComments: Int
    countLikes: Int
    comments: [Comment]
    likes: [Like]
    createdAt: String
  }
`

