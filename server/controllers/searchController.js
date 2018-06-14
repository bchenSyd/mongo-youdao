const db = require("../db");

const search = async keyword => {
  const matches = await db
    .get()
    .collection("words")
    .find({
      explaination: {
        $regex: keyword,
        $options: "i"
      }
    })
    .toArray();
  return {
    q: keyword,
    count: matches.length,
    matches
  };
};

module.exports = {
  search
};
