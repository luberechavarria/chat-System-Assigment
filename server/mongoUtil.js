
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";


let _db;

const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const poolSize = 10;
const DATABASE_NAME = 'mydb';
module.exports = {
  connectToServer: async function () {
    try {
      const client = await MongoClient.connect(url, clientOptions);
      client.topology.poolSize = poolSize;
      _db = client.db( DATABASE_NAME);
      console.log('Connected to MongoDB');
      return _db;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err; // Propagate the error
     
    }
  },

  getDb: function () {
    if (!_db) {
      throw new Error('Database is not connected.');
    }
    return _db;
  },

  closeDb: function () {
    if (_db) {
      _db.close();
      console.log('MongoDB connection closed.');
    }
  },
};