import React from "react";
import { Switch, Route } from "react-router-dom";
import logo from "./styles/logo.svg";
import Home from "./components/home";
import Result from "./components/result";

const App = ({ location }) => {
  return (
    <div className="app">
      <header className="header-footer">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className="app-content">
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/result" component={Result} />
        </Switch>
      </div>
      <footer className="header-footer">
        <div>copy-rght: bochen2014@yahoo.com</div>
      </footer>
    </div>
  );
};

export default App;
