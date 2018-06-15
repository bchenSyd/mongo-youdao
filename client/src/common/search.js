import fetch from "../common/fetch";

const queryString = queryObj => {
  return Object.keys(queryObj)
    .reduce(
      (acc, val) => acc + `&${val}=` + encodeURIComponent(queryObj[val]),
      ""
    )
    .slice(1);
};

const search = (keyword, pageNum = 1) => {
  return new Promise((res, rej) => {
    fetch(
      `/api/search?${queryString({
        q: keyword,
        pageNum
      })}`
    )
      .then(result => {
        res(result);
      })
      .catch(err => {
        rej(err);
      });
  });
};

export default search;
