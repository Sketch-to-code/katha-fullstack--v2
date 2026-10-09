const db = require('../db/connection');
const Bookmark = require('../models/Bookmark');
const MongoRepository = require('../repositories/MongoRepository');
const InMemoryRepository = require('../repositories/InMemoryRepository');
const progressBus = require('./events/readingProgressEmitter');

// Every function below talks to `repo`, never to Mongoose or the in-memory
// Map directly. Which concrete repository `repo` points at is decided once,
// lazily, based on whether db/connection.js managed to reach MongoDB.
let repo;
function getRepo() {
  if (!repo) {
    repo = db.isReady() ? new MongoRepository(Bookmark) : new InMemoryRepository();
  }
  return repo;
}

async function listBookmarks(userId, documentId) {
  const filter = documentId ? { userId, documentId } : { userId };
  return getRepo().findAll(filter);
}

async function addBookmark(userId, { documentId, page, thumbnailUrl }) {
  const bookmark = await getRepo().create({ userId, documentId, page, thumbnailUrl });
  progressBus.emit('bookmark:created', { userId, documentId, page });
  return bookmark;
}

async function removeBookmark(userId, id) {
  const existing = await getRepo().findById(id);
  if (!existing || String(existing.userId) !== String(userId)) {
    return false;
  }
  return getRepo().remove(id);
}

module.exports = { listBookmarks, addBookmark, removeBookmark };
