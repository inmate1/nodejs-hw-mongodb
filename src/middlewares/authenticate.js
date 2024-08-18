import createHttpError from 'http-errors';

import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';




export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = createHttpError(401, 'Auth header should be of type Bearer');
    error.error = 'Auth header missing';
    return next(error);
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || typeof token !== 'string') {
    const error = createHttpError(401, 'Invalid access token format');
    error.error = 'Invalid token';
    return next(error);
  }

  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    const error = createHttpError(401, 'Session not found');
    error.error = 'Session missing';
    return next(error);
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    const error = createHttpError(401, 'Token expired');
    error.error = 'Access token expired';
    return next(error);
  }

  const user = await User.findById(session.userId);
  if (!user) {
    const error = createHttpError(401, 'User not found');
    error.error = 'User missing';
    return next(error);
  }

  req.user = user;
  next();
};