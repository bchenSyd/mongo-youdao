import React, { Component, Fragment } from "react";
import { ReactSpinner } from "react-spinning-wheel";
import classNames from "classnames/bind";
import Record from "../components/record";
import Paginator from "../components/pageinator";
import { encode, decode } from "../common/queryString";
import search from "../common/search";
import styles from "./result.less";

const cx = classNames.bind(styles);
const NoResult = ({ keyword }) => (
  <Fragment>the query for {keyword} returns no result</Fragment>
);

class Result extends Component {
  state = {
    isloading: false,
    queryResult: null
  };

  componentDidMount() {
    const {
      location: { search },
      history
    } = this.props;

    const { q, pageNum } = decode(search);
    if (!q) {
      history.push("/");
    }

    this.query(q, pageNum);
  }

  buildPaginatorLink = q => pageNum =>
    `/result?${encode({
      q,
      pageNum
    })}`;

  query = (q, pageNum = 1) => {
    this.setState({
      isloading: true
    });
    search(
      encode({
        q,
        pageNum
      })
    )
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
    const { isloading } = this.state;
    if (isloading) {
      return <ReactSpinner className={cx("react-spinner")} />;
    }

    const { queryResult } = this.state;
    if (!queryResult) {
      return null;
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
              buildPaginatorLink={this.buildPaginatorLink(q)}
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
