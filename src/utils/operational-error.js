const errorList = {
  EMAIL_MISSING: {
    httpStatus: 400,
    message: 'Please provide your email',
  },
  PWD_MISSING: {
    httpStatus: 400,
    message: 'Please provide the password',
  },
  INVALID_EMAIL: {
    httpStatus: 400,
    message: 'Email address is invalid',
  },
  PWD_MIN_LEN_6: {
    httpStatus: 400,
    message: 'Password must be at least 6 characters',
  },
  INCORRECT_EMAIL_PWD: {
    httpStatus: 401,
    message: 'Incorrect email or password',
  },
  DUP_USER: {
    httpStatus: 409,
    message: 'A user with provided email already exists',
  },
  VALIDATION_ERROR: {
    httpStatus: 400,
    message: 'Please check your input fields for errors',
  },
};

class OperationalError extends Error {
  constructor(errorCode, validationErrorCodes) {
    super();

    let error = errorList[errorCode];
    error.code = '';

    if (!error) {
      error = {};

      error.httpStatus = 500;
      error.message = 'An unknown operational error happend';
      error.code = 'UNKNOWN:_';
    }
    error.code = error.code.concat(errorCode);

    if (errorCode === 'VALIDATION_ERROR') {
      const validationErrors = [];

      for (const errorCode of validationErrorCodes) {
        const validationError = {
          code: errorCode,
          message: errorList[errorCode].message,
        };

        validationErrors.push(validationError);
      }

      error.validationErrors = validationErrors;
    }

    Object.assign(this, error);
  }

  isOperational = true;
}

export default OperationalError;
