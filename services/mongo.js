const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

exports.connect = async (callback) => {

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'rap-vocab-counter';


  // Use connect method to connect to the server
  await MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo server");

    const database = client.db(dbName);

    callback(database, client)

    client.close();

  })
}

exports.insertDocuments = (db, collection_name, params) => {
  // Get the documents collection
  const collection = db.collection(collection_name);
  // Insert some documents
  collection.createIndex( { "slug": 1 }, { unique: true } )

  collection.insertMany([params], function(err, result) {
    if(err){
      console.log('duplicate')
      // todo inform the client of the duplicate entry
    }
    else{
      assert.equal(err, null);
      console.log(err)
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("Inserted 1 item into the collection");
    }
  });
}

exports.findDocuments = (db, collection_name, callback) => {
  // Get the documents collection
  const collection = db.collection(collection_name);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

exports.findDocumentsByColumnName = (db, collection_name, filter, callback) => {
  // Get the documents collection
  const collection = db.collection(collection_name);

  collection.find( { $where: filter } ).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  })

}