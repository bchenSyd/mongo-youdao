const { MongoClient, ObjectID } = require("mongodb");
const { connection_str } = require("./config");

let db;
const connect = async () => {
  if (!db) {
    db = await MongoClient.connect(connection_str);
    console.log(`mongodb connected to ${connection_str}`);
  }
};

const get = () => db;

const close = async () => {
  if (db) {
    await db.close();
    console.log(`connection to mongodb ${connection_str} closed successfully`);
  }
};

module.exports = { get, connect, close, ObjectID };
