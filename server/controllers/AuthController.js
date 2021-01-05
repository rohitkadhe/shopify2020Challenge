const User = require('../models/User');
const db = require('../db/db');
const AuthService = require('../services/AuthService');
const Time = require('../constants/time');
const AuthErrors = require('../errors/AuthErrors');
const { BAD_REQUEST } = require('../errors/HttpErrors');
const { ACCOUNT_EXISTS, INVALID_FIELDS, INVALID_CREDENTIALS } = AuthErrors;

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let validReq = AuthService.validateRegisterRequestDat(name, email, password);
    if (validReq === false) return next({ message: INVALID_FIELDS, status: BAD_REQUEST });
    let acc = await AuthService.accountExists(email);

    if (acc.length != 0) return next({ message: ACCOUNT_EXISTS, status: BAD_REQUEST });

    const hashedPassword = await AuthService.hashPassword(password);
    const user = new User(email, name, hashedPassword);

    const savedUser = await db('users').insert(user).returning(['id', 'name', 'email']);
    const token = AuthService.genToken({ id: user.id }, { expiresIn: Time.ONE_HOUR });
    res.json({ user: savedUser[0], token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let validReq = AuthService.validateLoginRequestDat(email, password);
    const user = await db('users').select('*').column('email').where('email', email);
    if (!validReq || user.length == 0)
      return next({ message: INVALID_FIELDS, status: BAD_REQUEST });

    const authenticated = await AuthService.comparePasswords(password, user[0].password);

    if (!authenticated) return next({ message: INVALID_CREDENTIALS, status: BAD_REQUEST });

    const token = AuthService.genToken({ id: user[0].id }, { expiresIn: Time.ONE_HOUR });

    res.json({
      user: new User(user[0].email, user[0].name, undefined, user[0].id),
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
