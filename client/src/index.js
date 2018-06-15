import './polyfills';
import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './app';
import './index.less';
import "react-spinning-wheel/dist/style.css";
import './react-spinner.less';

ReactDom.render(
  <Router>
    <Route component={App} />
  </Router>,
  document.querySelector("#root")
);
