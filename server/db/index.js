const { MongoClient, ObjectID } = require("mongodb");
const { connection_str } = require("./config");
const chalk = require("chalk");

let client, db;
const db_name = 'heroku_10052d44';
const connect = async () => {
  if (!db) {
    client = await MongoClient.connect(connection_str);
    db=client.db(db_name);
    console.log(chalk.cyan(`mongodb connected to ${connection_str}`));
  }
};

const get = () => db;

const close = async () => {
  if (client) {
    await client.close();
    console.log(
      chalk.green(`disconnected from ${connection_str} successfully`)
    );
  }
};

module.exports = { get, connect, close, ObjectID };
