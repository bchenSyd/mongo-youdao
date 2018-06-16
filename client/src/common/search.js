import fetch from "../common/fetch";

const search = queryParam => {
  return new Promise((res, rej) => {
    fetch(`/api/search?${queryParam}`)
      .then(result => {
        res(result);
      })
      .catch(err => {
        rej(err);
      });
  });
};

export default search;
