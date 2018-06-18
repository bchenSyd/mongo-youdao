const encode = queryObj => {
  return Object.keys(queryObj)
    .reduce((acc, val) => {
      const append = queryObj[val]
        ? `&${val}=` + encodeURIComponent(queryObj[val])
        : "";
      return acc + append;
    }, "")
    .slice(1);
};
const decode = queryString => {
  if (!queryString) {
    return {};
  }
  let _query = queryString;
  if (_query[0] === "?") {
    _query = _query.slice(1);
  }
  const queries = _query.split("&");
  return queries.reduce((acc, val) => {
    const [key, value] = val.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
};
export { encode, decode };
