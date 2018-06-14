import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './app';
import '../styles/index.less';

ReactDom.render(
  <Router>
    <Route component={App} />
  </Router>,
  document.querySelector("#root")
);
