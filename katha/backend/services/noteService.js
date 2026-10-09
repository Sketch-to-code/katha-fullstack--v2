const db = require('../db/connection');
const Note = require('../models/Note');
const MongoRepository = require('../repositories/MongoRepository');
const InMemoryRepository = require('../repositories/InMemoryRepository');

let repo;
function getRepo() {
  if (!repo) {
    repo = db.isReady() ? new MongoRepository(Note) : new InMemoryRepository();
  }
  return repo;
}

async function listNotes(userId, documentId) {
  const filter = documentId ? { userId, documentId } : { userId };
  return getRepo().findAll(filter);
}

async function addNote(userId, { documentId, page, highlightedText, body }) {
  return getRepo().create({ userId, documentId, page, highlightedText, body });
}

async function updateNote(userId, id, patch) {
  const existing = await getRepo().findById(id);
  if (!existing || String(existing.userId) !== String(userId)) return null;
  return getRepo().update(id, patch);
}

async function removeNote(userId, id) {
  const existing = await getRepo().findById(id);
  if (!existing || String(existing.userId) !== String(userId)) return false;
  return getRepo().remove(id);
}

module.exports = { listNotes, addNote, updateNote, removeNote };
