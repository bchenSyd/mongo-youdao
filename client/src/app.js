import React from "react";
import { Switch, Route } from "react-router-dom";
import logo from "../styles/logo.svg";
import { HomePage, ResultPage, ErrorPage } from "./layouts";

const App = ({ location }) => {
  return (
    <div className="app">
      <header className="header-footer">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className="app-content">
        <Switch location={location}>
          <Route exact path="/" component={HomePage} />
          <Route path="/result" component={ResultPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <footer className="header-footer">
        <div>copy-rght: bochen2014@yahoo.com</div>
      </footer>
    </div>
  );
};

export default App;
