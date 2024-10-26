export default (_function) => {
  return (req, res, next) => {
    _function(req, res, next).catch(next);
  };
};
