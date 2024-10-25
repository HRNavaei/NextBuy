import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as config from '../config.js';
import User from '../model/user-model.js';
import errorHandler from '../utils/error-handler.js';

export const signup = errorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

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
