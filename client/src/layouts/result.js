import React, { Fragment } from "react";
import Record from "../components/record";

const Result = ({ location }) => {
  const {
    state: { q, count, matches }
  } = location;

  const displayNoResult = keyword => (
    <Fragment>the query for {keyword} returns no result</Fragment>
  );
  return (
    <div>
      {count ? (
        <div>{matches.map(m => <Record key={`_key${m.id}`} {...m} />)}</div>
      ) : (
        displayNoResult(q)
      )}
    </div>
  );
};

export default Result;
