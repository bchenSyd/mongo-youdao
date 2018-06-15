import React from 'react';
import classNames from 'classnames/bind';
import styles from './paginator.less';

const cx = classNames.bind(styles);
const Paginator = ({ totalPages, currentPageNum, pageNavigation }) => {
    const naviRange = 2; //  1 ... 4  5  *6*  7  8 ... 38
    const pageNumbers = Array.from({ length: naviRange * 2 + 1 },
        (_, i) => currentPageNum - naviRange + i)
        .filter(n => n > 0 && n <= totalPages); // -3 -- 3

    const showLeftLump = () => {
        const leftLump = [];
        if (currentPageNum > naviRange + 1) {
            leftLump.push(<a href="#" key={`page_1`} onClick={pageNavigation(1)}>1</a>);
        }
        if (currentPageNum > naviRange + 2) {
            leftLump.push(<span key={`page_left_lump`}>...</span>);
        }
        return leftLump;
    };
    const showRightLump = () => {
        const rightLump = [];
        if (totalPages > currentPageNum + naviRange + 1) {
            rightLump.push(<span key={`page_right_lump`}>...</span>);
        }
        if (totalPages > currentPageNum + naviRange) {
            rightLump.push(<a href="#" key={`page_${totalPages}`} onClick={pageNavigation(totalPages)}>{totalPages}</a>);
        }
        return rightLump;
    };
    return (
        <div className={cx('paginator')}>
            {showLeftLump()}
            {pageNumbers.map(p =>
                (p === currentPageNum ? <span key={`page_${p}`}>{p}</span>
                    : <a href="#" key={`page_${p}`} onClick={pageNavigation(p)}>{p}</a>))}
            {showRightLump()}
        </div>
    );
};

export default Paginator;
