import React from "react";
import { encode } from "../common/queryString";
import classNames from "classnames/bind";
import styles from "./home.less";

const cx = classNames.bind(styles);
const Home = ({ history }) => {
  const onClick = () => {
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
  const handleEnterKey = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div className={cx(["home-page", "wrapper"])}>
      <div className={cx("search-box")}>
        <input name="q" onKeyPress={handleEnterKey} />
        <button onClick={onClick}>search</button>
      </div>
    </div>
  );
};

export default Home;
