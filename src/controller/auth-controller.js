import jwt from 'jsonwebtoken';

import * as config from '../config.js';
import User from '../model/user-model.js';
import handleAsyncError from '../utils/async-error-handler.js';
import OperationalError from '../utils/operational-error.js';

export const signup = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  let user = null;
  try {
    user = await User.create({
      email,
      password,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrorCodes = [];

      const validationErrorFields = Object.keys(err.errors);
      for (const field of validationErrorFields) {
        validationErrorCodes.push(err.errors[field].message);
      }

      throw new OperationalError('VALIDATION_ERROR', validationErrorCodes);
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
      throw new OperationalError('DUP_USER');
    }
  }
  user = user.toObject();
  delete user.password;

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE_AFTER,
  });

  res.status(201).json({
    state: 'success',
    data: {
      user,
      token,
    },
  });
});
