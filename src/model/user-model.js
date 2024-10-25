import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    validation: {
      validate: validator.isEmail,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password should be at least 6 characters'],
  },
  createdAt: {
    type: Date,
    required: [true, 'Date attribute for user is missing'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
