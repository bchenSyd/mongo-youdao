import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './backTop.less';

const cx= classNames.bind(styles);
class BackTop extends Component {
    render() {
        return (
            <div className={cx('backtop')}>
                <div className={cx('backtop-content')}>
                    <div className={cx('backtop-icon')}></div>
                </div>
            </div>
        );
    }
}

export default BackTop;