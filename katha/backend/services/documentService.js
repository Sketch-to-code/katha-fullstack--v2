const db = require('../db/connection');
const DocumentModel = require('../models/Document');
const MongoRepository = require('../repositories/MongoRepository');
const InMemoryRepository = require('../repositories/InMemoryRepository');
const { CoverFactory } = require('./factories/CoverFactory');
const progressBus = require('./events/readingProgressEmitter');

const SEED = [
  {
    _id: 'doc-1',
    userId: 'demo-user',
    title: 'The Wind-Up Bird Chronicle',
    author: 'Haruki Murakami',
    fileUrl: '/uploads/wind-up-bird.pdf',
    pageCount: 607,
    hasNativeCover: true,
    coverUrl: '/covers/wind-up-bird.jpg',
    lastPageRead: 214,
    lastOpenedAt: new Date().toISOString(),
  },
  {
    _id: 'doc-2',
    userId: 'demo-user',
    title: 'Design Patterns',
    author: 'Gamma, Helm, Johnson, Vlissides',
    fileUrl: '/uploads/gof-design-patterns.pdf',
    pageCount: 395,
    hasNativeCover: false,
    lastPageRead: 42,
    lastOpenedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'doc-3',
    userId: 'demo-user',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    fileUrl: '/uploads/brief-history-of-time.pdf',
    pageCount: 256,
    hasNativeCover: true,
    coverUrl: '/covers/brief-history.jpg',
    lastPageRead: 0,
    lastOpenedAt: null,
  },
];

let repo;
function getRepo() {
  if (!repo) {
    repo = db.isReady() ? new MongoRepository(DocumentModel) : new InMemoryRepository(SEED);
  }
  return repo;
}

async function listLibrary(userId) {
  const docs = await getRepo().findAll({ userId });
  return docs.map((doc) => ({
    ...doc,
    cover: CoverFactory.create({
      hasNativeCover: doc.hasNativeCover,
      existingCoverUrl: doc.coverUrl,
      title: doc.title,
      author: doc.author,
    }),
    progressPct: doc.pageCount ? Math.round((doc.lastPageRead / doc.pageCount) * 100) : 0,
  }));
}

async function getMostRecent(userId) {
  const docs = await listLibrary(userId);
  return docs
    .filter((d) => d.lastOpenedAt)
    .sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt))[0] || null;
}

async function updateProgress(userId, documentId, page) {
  const updated = await getRepo().update(documentId, {
    lastPageRead: page,
    lastOpenedAt: new Date().toISOString(),
  });
  progressBus.emit('progress:update', { userId, documentId, page });
  return updated;
}

module.exports = { listLibrary, getMostRecent, updateProgress, getRepo };
