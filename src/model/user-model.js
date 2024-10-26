import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'EMAIL_MISSING'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'INVALID_EMAIL',
    },
  },
  password: {
    type: String,
    required: [true, 'PWD_MISSING'],
    minLength: [6, 'PWD_MIN_LEN_6'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);

  next();
});

userSchema.methods.verifyProvidedPassword = function (providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
