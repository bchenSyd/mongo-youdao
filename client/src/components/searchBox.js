import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./searchBox.less";

const cx = classNames.bind(styles);
const SearchBox = forwardRef(({ defaultValue,  className, onClick }, ref) => {
  const handleEnterKey = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div className={`${cx("search-box")} ${className}` } >
      <input name="q" defaultValue={defaultValue} onKeyPress={handleEnterKey} ref={ref} />
      <button onClick={onClick}>search</button>
    </div>
  );
});

export default SearchBox;
