const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const User = require('../models/User');
const MongoRepository = require('../repositories/MongoRepository');
const InMemoryRepository = require('../repositories/InMemoryRepository');

let repo;
function getRepo() {
  if (!repo) {
    repo = db.isReady() ? new MongoRepository(User) : new InMemoryRepository();
  }
  return repo;
}

function signToken(user) {
  return jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register({ name, email, password }) {
  const existing = (await getRepo().findAll({ email })).length > 0;
  if (existing) {
    const err = new Error('An account with that email already exists.');
    err.status = 409;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await getRepo().create({
    name,
    email,
    passwordHash,
    preferences: { theme: 'sepia', readingMode: 'leisure', soundscape: 'none' },
  });
  return { token: signToken(user), user: sanitize(user) };
}

async function login({ email, password }) {
  const [user] = await getRepo().findAll({ email });
  if (!user) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }
  return { token: signToken(user), user: sanitize(user) };
}

function sanitize(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

module.exports = { register, login };
