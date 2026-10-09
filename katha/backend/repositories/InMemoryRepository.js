const { randomUUID } = require('crypto');

// A tiny repository that honours the same shape a Mongoose-backed
// repository would (find/findById/create/update/remove). Controllers and
// services never import this directly - they go through bookmarkService /
// noteService / documentService, which pick this or the Mongo-backed
// implementation at startup depending on whether MONGO_URI is set. That's
// the Dependency Inversion seam described in the design document: swapping
// storage later touches this file only.
class InMemoryRepository {
  constructor(seed = []) {
    this.rows = new Map(seed.map((row) => [row._id, row]));
  }

  async findAll(filter = {}) {
    return [...this.rows.values()].filter((row) =>
      Object.entries(filter).every(([key, value]) => String(row[key]) === String(value))
    );
  }

  async findById(id) {
    return this.rows.get(id) || null;
  }

  async create(data) {
    const _id = data._id || randomUUID();
    const now = new Date().toISOString();
    const row = { _id, createdAt: now, updatedAt: now, ...data };
    this.rows.set(_id, row);
    return row;
  }

  async update(id, patch) {
    const existing = this.rows.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    this.rows.set(id, updated);
    return updated;
  }

  async remove(id) {
    return this.rows.delete(id);
  }
}

module.exports = InMemoryRepository;
