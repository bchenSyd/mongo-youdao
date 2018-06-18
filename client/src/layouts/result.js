import React, { PureComponent, Fragment } from "react";
import { ReactSpinner } from "react-spinning-wheel";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Record, Paginator, BackTop } from "../components";
import { encode, decode } from "../common/queryString";
import { search as searchAPI } from "../common/apiClient";
import styles from "./result.less";

const cx = classNames.bind(styles);
const NoResult = ({ keyword }) => (
  <div className={cx("no-result")}>
    <h2>the query for {keyword} returns no result</h2>
    <i>make sure your got keyword and pageNumber correct</i>
  </div>
);

class Result extends PureComponent {
  state = {
    isloading: false,
    queryResult: null
  };

  componentDidMount() {
    this.queryData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location: locationOld } = prevProps;
    const { location } = this.props;
    if (locationOld !== location) {
      this.queryData();
    }
  }

  buildPaginatorLink = q => pageNum =>
    `/result?${encode({
      q,
      pageNum
    })}`;
  onGotoPage = q => pageNum => {
    const { history } = this.props;
    history.push(
      `/result?${encode({
        q,
        pageNum
      })}`
    );
  };
  queryData = () => {
    const {
      location: { search },
      history
    } = this.props;

    const { q, pageNum } = decode(search);
    this.setState({
      isloading: true
    });

    searchAPI(
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
        <Link to="/">Home</Link>
        {totalPages && totalPages >= currentPage ? (
          <Fragment>
            <div className={cx("result-data")}>
              {data.map(d => <Record key={`_key_${d.index}`} {...d} />)}
            </div>
            <BackTop />
            <Paginator
              totalPages={totalPages}
              currentPageNum={currentPage}
              buildPaginatorLink={this.buildPaginatorLink(q)}
              onGotoPage={this.onGotoPage(q)}
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
