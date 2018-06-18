import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import classNames from "classnames/bind";
import styles from "./paginator.less";

const cx = classNames.bind(styles);
const Paginator = props => {
  const {
    className,
    totalPages,
    currentPageNum,
    buildPaginatorLink,
    pageNumber,
    onChange,
    onClick
  } = props;
  const naviRange = 1; //  1 ... 4  5  *6*  7  8 ... 38
  const pageNumbers = Array.from(
    { length: naviRange * 2 + 1 },
    (_, i) => currentPageNum - naviRange + i
  ).filter(n => n > 0 && n <= totalPages); // -3 -- 3

  const showLeftLump = () => {
    const leftLump = [];
    if (currentPageNum > naviRange + 1) {
      leftLump.push(
        <Link to={buildPaginatorLink(1)} key={`page_1`}>
          1
        </Link>
      );
    }
    if (currentPageNum > naviRange + 2) {
      leftLump.push(<span key={`page_left_lump`}>...</span>);
    }
    return leftLump;
  };
  const showRightLump = () => {
    const rightLump = [];
    if (totalPages > currentPageNum + naviRange + 1) {
      rightLump.push(<span key={`page_right_lump`}>...</span>);
    }
    if (totalPages > currentPageNum + naviRange) {
      rightLump.push(
        <Link to={buildPaginatorLink(totalPages)} key={`page_${totalPages}`}>
          {totalPages}
        </Link>
      );
    }
    return rightLump;
  };
  const onKeyPress = e => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };
  return (
    <div className={`${cx("paginator")} ${className}`}>
      <div className={cx("paginator-pages")}>
        {showLeftLump()}
        {pageNumbers.map(
          p =>
            p === currentPageNum ? (
              <span key={`page_${p}`}>{p}</span>
            ) : (
              <Link to={buildPaginatorLink(p)} key={`page_${p}`}>
                {p}
              </Link>
            )
        )}
        {showRightLump()}
      </div>
      <div className={cx("paginator-goto")}>
        <input value={pageNumber} onChange={onChange} onKeyPress={onKeyPress}/>
        <a href="#" onClick={onClick} >
          Go
        </a>
      </div>
    </div>
  );
};

const enhance = compose(
  withState("pageNumber", "setPageNumber", ""),
  withHandlers({
    onChange: ({ setPageNumber }) => event => {
      const { value } = event.target;
      setPageNumber(value);
    },
    onClick: props => e => {
      e.preventDefault();
      const { pageNumber, onGotoPage } = props;
      onGotoPage(pageNumber);
    }
  })
);
export default enhance(Paginator);
