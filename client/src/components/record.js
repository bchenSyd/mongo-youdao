import React from "react";
import classNames from "classnames/bind";
import styles from "./record.less";

const cx = classNames.bind(styles);
const Record = props => {
  const { index, word, pronouncation, explaination } = props;
  const pronc=pronouncation.slice(1,-1);
  return (
    <div id={`_id-${index}`} className={cx("wrapper")}>
      <h2>{word}</h2>
      {pronc && <div>/{pronc}/</div>}
      <div>
        <pre>{explaination}</pre>
      </div>
    </div>
  );
};

export default Record;
