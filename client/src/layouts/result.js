import React, { Component, Fragment } from "react";
import classNames from "classnames/bind";
import Record from "../components/record";
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

  render() {
    const {
      location: { state }
    } = this.props;
    if (!state) {
      return null;
    }
    const { q, count, matches } = state;
    return (
      <div className={cx("results")}>
        {count ? (
          <div>
            {matches.map(m => <Record key={`_key_${m.index}`} {...m} />)}
          </div>
        ) : (
          this.displayNoResult(q)
        )}
      </div>
    );
  }
}

export default Result;
