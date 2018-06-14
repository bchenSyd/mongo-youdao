const db = require("../db");

const search = async keyword => {
  const results = await db
    .get()
    .collection("words")
    .find({
      explaination: {
        $regex: keyword,
        $options: "i"
      }
    })
    .limit(50)
    .toArray();
  return {
    q: keyword,
    results
  };
};

module.exports = {
  search
};
