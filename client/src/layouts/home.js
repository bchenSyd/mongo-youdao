import React from "react";
import { ReactSpinner } from "react-spinning-wheel";
import { compose, withState, withHandlers } from "recompose";
import search from "../common/search";
import classNames from "classnames/bind";
import styles from "./home.less";

const cx = classNames.bind(styles);
const Home = ({ history, isloading, startLoading }) => {
  const onClick = () => {
    const { value: keyword } = document.querySelector(`input[name='q']`);
    if (!keyword) {
      return;
    }
    search(keyword)
      .then(result => {
        history.push({
          pathname: "/result",
          state: result
        });
      })
      .catch(err => {
        history.push("/error");
      });
    startLoading();
  };
  const handleEnterKey = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div className={cx(["home-page", "wrapper"])}>
      {isloading && <ReactSpinner className={cx("react-spinner")} />}
      <div className={cx("search-box")}>
        <input name="q" onKeyPress={handleEnterKey} />
        <button onClick={onClick}>search</button>
      </div>
    </div>
  );
};

const enhance = compose(
  withState("isloading", "setIsLoading", false),
  withHandlers({
    startLoading: ({ setIsLoading }) => () => setIsLoading(true),
    endLoading: ({ setIsLoading }) => () => setIsLoading(false)
  })
);

export default enhance(Home);
