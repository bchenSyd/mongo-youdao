import React, { createRef, Component } from "react";
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
  ref = createRef();

  componentDidMount() {
    this.footerNode = document.querySelector("footer");
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getScrollOffset = () => {
    return (
      window.pageYOffset || //most browsers except IE before #9
      document.body.scrollTop || // IE 'quirks'
      document.documentElement.scrollTop // IE with 'doctype'
    );
  };

  setScrollTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  handleScroll = () => {
    const footerClientRect = this.footerNode.getBoundingClientRect();
    const windowClientHeight = document.body.clientHeight;

    const style = this.ref.current.style;
    style.display = this.getScrollOffset() > 400 ? "block" : "none";
    if (footerClientRect.top < windowClientHeight) {
      // footer is visible
      style.position = "absolute";
      style.bottom = "";
      style.top = this.getScrollOffset() + footerClientRect.top - 90 + "px";
    } else {
      // footer is invisible; backTop should fix to viewport bottom
      style.position = "fixed";
      style.bottom = "50px";
      style.top = "";
    }
  };

  scrollToTop = () => {
    const scrollTop = this.getScrollOffset();
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
    return (
      <div ref={this.ref} className={cx("backtop")}>
        <div className={cx("backtop-content")} onClick={this.scrollToTop}>
          <div className={cx("backtop-icon")} />
        </div>
      </div>
    );
  }
}

export default BackTop;
