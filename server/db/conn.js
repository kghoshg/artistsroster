
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient("mongodb://root:root@mongo-db:27017/artists?authSource=admin&w=1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("artists");
        console.log("Successfully connected to MongoDB."); 
      }else{
        console.log("Connection to MongoDB failed." + process.env.ATLAS_URI);
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};

