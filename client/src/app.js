import React from "react";
import { Switch, Route } from "react-router-dom";
import logo from "../assets/logo.svg";
import { HomePage, ResultPage, ErrorPage } from "./layouts";
import classNames from "classnames/bind";
import styles from "./app.less";

const cx = classNames.bind(styles);
const App = ({ location }) => {
  return (
    <div className={cx("app")}>
      <header className={cx("header")}>
        <img src={logo} className={cx("logo")} alt="logo" />
      </header>
      <div className={cx("app-content")}>
        <Switch location={location}>
          <Route exact path="/" component={HomePage} />
          <Route path="/result" component={ResultPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <footer className={cx("footer")}>
        <div>copy-rght: bochen2014@yahoo.com</div>
      </footer>
    </div>
  );
};

export default App;
