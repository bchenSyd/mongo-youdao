import React, { PureComponent, createRef } from "react";
import { encode } from "../common/queryString";
import classNames from "classnames/bind";
import styles from "./home.less";

const cx = classNames.bind(styles);

class Home extends PureComponent {
  queryRef = createRef();

  componentDidMount() {
    this.queryRef.current.focus();
  }
  
  onClick = () => {
    const { history } = this.props;
    const { value: keyword } = document.querySelector(`input[name='q']`);
    if (!keyword) {
      return;
    }
    history.push(
      `/result?${encode({
        q: keyword
      })}`
    );
  };
  handleEnterKey = e => {
    if (e.key === "Enter") {
      this.onClick();
    }
  };
  render() {
    return (
      <div className={cx(["home-page", "wrapper"])}>
        <div className={cx("search-box")}>
          <input name="q" onKeyPress={this.handleEnterKey} ref={this.queryRef}/>
          <button onClick={this.onClick}>search</button>
        </div>
      </div>
    );
  }
}

export default Home;
