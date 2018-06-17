import React, { Component } from "react";
import classNames from "classnames/bind";
import raf from "raf";
import styles from "./backTop.less";

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

const cx = classNames.bind(styles);
class BackTop extends Component {
  state = {
    visible: false
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getCurrentScrollTop = () => {
    return (
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop
    );
  };

  setScrollTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  handleScroll = () => {
    this.setState({
      visible: this.getCurrentScrollTop() > 400
    });
  };

  scrollToTop = () => {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        raf(frameFunc);
      }
    };
    raf(frameFunc);
  };

  render() {
    const { visible } = this.state;
    return (
      <div className={cx("backtop")}>
        {visible && (
          <div className={cx("backtop-content")} onClick={this.scrollToTop}>
            <div className={cx("backtop-icon")} />
          </div>
        )}
      </div>
    );
  }
}

export default BackTop;
