import React, { Component, Fragment } from "react";
import { ReactSpinner } from "react-spinning-wheel";
import classNames from "classnames/bind";
import Record from "../components/record";
import Paginator from "../components/pageinator";
import search from "../common/search";
import styles from "./result.less";

const cx = classNames.bind(styles);
const NoResult = ({ keyword }) => (
  <Fragment>the query for {keyword} returns no result</Fragment>
);

class Result extends Component {
  state = {
    isloading: false,
    queryResult: this.props.location.state
  };

  componentDidMount() {
    const {
      location: { state },
      history
    } = this.props;
    if (!state) {
      history.push("/");
    }
  }

  pageNavigation = q => pageNum => e => {
    const { history } = this.props;
    // how to prevent <a href="#"> change url?
    e.preventDefault(); // you can't return false to prevent default; you must call preventDefault
    this.setState({
      isloading: true
    });
    search(q, pageNum)
      .then(result => {
        this.setState({
          queryResult: result,
          isloading: false
        });
      })
      .catch(err => {
        history.push("/error");
      });
  };

  render() {
    const { queryResult } = this.state;
    if (!queryResult) {
      return null;
    }
    const { isloading } = this.state;
    if (isloading) {
      return <ReactSpinner className={cx("react-spinner")} />;
    }

    const { q, totalPages, currentPage, data } = queryResult;
    return (
      <div className={cx("results")}>
        {totalPages ? (
          <Fragment>
            <div className={cx("result-data")}>
              {data.map(d => <Record key={`_key_${d.index}`} {...d} />)}
            </div>
            <Paginator
              totalPages={Number(totalPages)}
              currentPageNum={Number(currentPage)}
              pageNavigation={this.pageNavigation(q)}
            />
          </Fragment>
        ) : (
          <NoResult keyword={q} />
        )}
      </div>
    );
  }
}

export default Result;
