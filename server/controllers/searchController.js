const db = require("../db");

const pageSize = 20;
const search = async ({ keyword, pageNumber = 1 }) => {
  const matches = await db
    .get()
    .collection("words")
    .find({
      explaination: {
        $regex: keyword,
        $options: "i"
      }
    });

  const totalCount = await matches.count();
  const data = await matches.skip((pageNumber - 1) * pageSize).limit(pageSize).toArray();
  return {
    q: keyword,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: Number(pageNumber),
    data
  };
};

module.exports = {
  search
};
