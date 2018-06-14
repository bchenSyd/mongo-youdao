import React, { Fragment } from "react";
import classNames from "classnames/bind";
import Record from "../components/record";
import styles from "./result.less";

const cx = classNames.bind(styles);
const Result = ({ location }) => {
  const {
    state: { q, count, matches }
  } = location;

  const displayNoResult = keyword => (
    <Fragment>the query for {keyword} returns no result</Fragment>
  );
  return (
    <div className={cx("results")}>
      {count ? (
        <div>{matches.map(m => <Record key={`_key_${m.index}`} {...m} />)}</div>
      ) : (
        displayNoResult(q)
      )}
    </div>
  );
};

export default Result;
