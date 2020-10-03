import { sign, verify } from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from '../config'

export const createAccessToken = (user) => {
  const data = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  }
  return sign(data, accessTokenSecret!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (user) => {
  const data = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  }
  return sign(data, refreshTokenSecret!, {
      expiresIn: "7d"
    }
  );
};

export const verifyToken = (token: string, expired?: boolean): any => {
  if (expired) return verify(token, refreshTokenSecret)
  return verify(token, accessTokenSecret)
}
