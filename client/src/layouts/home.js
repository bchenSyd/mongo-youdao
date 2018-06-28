import React, { PureComponent, createRef } from "react";
import { encode } from "../common/queryString";
import { SearchBox } from "../components";
import classNames from "classnames/bind";
import styles from "./home.less";

const cx = classNames.bind(styles);

class Home extends PureComponent {
  searchBoxRef = createRef();

  componentDidMount() {
    this.searchBoxRef.current.focus();
  }

  onClick = () => {
    const { history } = this.props;
    const { value: keyword } = document.querySelector(`input[name='q']`);
    history.push(
      `/result?${encode({
        q: keyword,
        pageNum: 1
      })}`
    );
  };

  render() {
    return (
      <div className={cx(["home-page", "wrapper"])}>
        <SearchBox ref={this.searchBoxRef} onClick={this.onClick} />
      </div>
    );
  }
}

export default Home;
