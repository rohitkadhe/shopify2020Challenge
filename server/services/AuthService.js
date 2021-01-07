const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
require('dotenv').config();

const validEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validPassword = (password) => {
  if (password === undefined || password === '') {
    return false;
  }
  return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  return false;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (reqPassword, userPassword) => {
  const res = await bcrypt.compare(reqPassword, userPassword);
  return res;
};

const genToken = (payload, options) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
};

const validateToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const accountExists = async (email) => {
  let user = await db('users').select('email').column('email').where('email', email);
  return user;
};

const validateRegisterRequestDat = (name, email, password) => {
  const res = validEmail(email) && validPassword(password) && !isEmpty(name);
  return res;
};

const validateLoginRequestDat = (email, password) => {
  const res = validEmail(email) && validPassword(password);
  return res;
};

module.exports = {
  validEmail,
  validPassword,
  hashPassword,
  isEmpty,
  comparePasswords,
  genToken,
  validateToken,
  accountExists,
  validateRegisterRequestDat,
  validateLoginRequestDat,
};
