export default (err, req, res, next) => {
  const revisedErr = reviseError(err);

  if (revisedErr.isOperational) {
    const resObj = {
      state: 'fail',
      code: revisedErr.code,
      message: revisedErr.message,
    };

    if (revisedErr.code === 'VALIDATION_ERROR') {
      resObj.validationErrors = err.validationErrors;
    }

    return res.status(revisedErr.httpStatus).json(resObj);
  }

  if (revisedErr.isMongoError) return handleMongoError(revisedErr, res);

  res.status(500).json({
    state: 'error',
    message: 'Internal server error',
    error: err,
  });
  console.log(err);
};

const reviseError = (err) => {
  const revisedErr = { ...err };

  if (err.name === 'MongoServerError') revisedErr.isMongoError = true;
  if (err.name === 'ValidationEror') revisedErr.isValidationError = true;

  return revisedErr;
};

const handleMongoError = (err, res) => {
  if (err.code === 11000) {
    res.status(400).json({
      state: 'fail',
      message: 'A user with provided email already existed',
    });
  }
};
