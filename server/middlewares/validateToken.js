const AuthService = require('../services/AuthService');
const HttpErrors = require('../errors/HttpErrors');

const validateToken = (req, res, next) => {
  authorization_header = req.headers.authorization;
  try {
    const headerContents = authorization_header.split(' '); // Bearer {token}
    const token = headerContents[1];
    let res = AuthService.validateToken(token);
    if (res === undefined) throw Error();

    req.user = res;
    next();
  } catch (err) {
    req.user = '';
    next({ message: 'Unauthorized', status: HttpErrors.UNAUTHORIZED });
  }
};

module.exports = validateToken;
