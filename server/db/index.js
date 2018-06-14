const { MongoClient, ObjectID } = require("mongodb");
const { connection_str } = require("./config");
const chalk = require("chalk");

let db;
const db_name = 'heroku_10052d44';
const connect = async () => {
  if (!db) {
    const client = await MongoClient.connect(connection_str);
    db=client.db(db_name);
    console.log(chalk.cyan(`mongodb connected to ${connection_str}`));
  }
};

const get = () => db;

const close = async () => {
  if (db) {
    await db.close();
    console.log(
      chalk.green(`disconnected from ${connection_str} successfully`)
    );
  }
};

module.exports = { get, connect, close, ObjectID };
