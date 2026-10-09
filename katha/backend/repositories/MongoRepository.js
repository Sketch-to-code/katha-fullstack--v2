// Adapts a Mongoose model to the same find/findById/create/update/remove
// contract as InMemoryRepository, so services never know which one they're
// talking to.
class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}) {
    return this.model.find(filter).lean();
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async create(data) {
    const doc = await this.model.create(data);
    return doc.toObject();
  }

  async update(id, patch) {
    return this.model.findByIdAndUpdate(id, patch, { new: true }).lean();
  }

  async remove(id) {
    const res = await this.model.findByIdAndDelete(id);
    return !!res;
  }
}

module.exports = MongoRepository;
