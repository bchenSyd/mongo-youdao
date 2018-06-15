import queryString from "query-string";
import fetch from "../common/fetch";

const search = (keyword, pageNum=1) => {
  return new Promise((res, rej) => {
    fetch(
      `/api/search?${queryString.stringify({
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
