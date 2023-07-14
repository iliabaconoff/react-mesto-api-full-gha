const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');

const handleError = (res, req, next) => {
  next(new Unauthorized('С токеном что-то не так.'));
};

module.exports = function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(res, req, next);

  try {
    const token = req.headers.authorization.split(' ')[1];
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return handleError(res, req, next);
  }

  req.user = payload;

  return next();
};
