import React, { Component } from "react";
import logo from "./styles/logo.svg";
import Home from "./components/home";

const App = () => {
  return (
    <div className="app">
      <header className="header-footer">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className="app-content">
        <Home />
      </div>
      <footer className="header-footer">
        <div>copy-rght: bochen2014@yahoo.com</div>
      </footer>
    </div>
  );
};

export default App;
