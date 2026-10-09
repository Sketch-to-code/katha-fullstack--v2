const mongoose = require('mongoose');

// Singleton pattern: the whole app imports this module and always gets the
// same connection state instead of re-dialing MongoDB per request, which
// would exhaust the connection pool under load.
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    this.isConnected = false;
    Database.instance = this;
  }

  async connect() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.log('[db] MONGO_URI not set - running on the in-memory repository fallback.');
      return null;
    }

    if (this.isConnected) {
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
      });
      this.isConnected = true;
      console.log('[db] Connected to MongoDB Atlas.');
      return this.connection;
    } catch (err) {
      console.error('[db] Failed to connect to MongoDB, falling back to in-memory store:', err.message);
      this.isConnected = false;
      return null;
    }
  }

  isReady() {
    return this.isConnected;
  }
}

module.exports = new Database();
