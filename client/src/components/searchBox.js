import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./searchBox.less";
import searchImg from '../../assets/search.svg'

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
      <img className = {cx('search-img')} src={searchImg} onClick={onClick} alt='search'/>
    </div>
  );
});

export default SearchBox;
