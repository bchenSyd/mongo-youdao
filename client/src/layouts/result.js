import React, { Component, Fragment } from "react";
import classNames from "classnames/bind";
import Record from "../components/record";
import Paginator from "../components/pageinator";
import styles from "./result.less";

const cx = classNames.bind(styles);
class Result extends Component {
  componentDidMount() {
    const {
      location: { state },
      history
    } = this.props;
    if (!state) {
      history.push("/");
    }
  }

  displayNoResult = keyword => (
    <Fragment>the query for {keyword} returns no result</Fragment>
  );

  pageNavigation = pageNum => e => {
    // how to prevent <a href="#"> change url?
    e.preventDefault(); // you can't return false to prevent default; you must call preventDefault

    this.props.pageNavigation(pageNum);
  };

  render() {
    const {
      location: { state }
    } = this.props;
    if (!state) {
      return null;
    }
    const { q, totalPages, currentPage, data } = state;
    return (
      <div className={cx("results")}>
        {totalPages ? (
          <Fragment>
            <div className={cx("result-data")}>
              {data.map(d => <Record key={`_key_${d.index}`} {...d} />)}
            </div>
            <Paginator
              totalPages={totalPages}
              currentPageNum={currentPage}
              pageNavigation={this.pageNavigation}
            />
          </Fragment>
        ) : (
          this.displayNoResult(q)
        )}
      </div>
    );
  }
}

export default Result;
