import React from "react";
import queryString from 'query-string';
import { ReactSpinner } from 'react-spinning-wheel';
import { compose, withState, withHandlers } from 'recompose';
import fetch from '../common/fetch';


const Home = ({ history, isloading, startLoading }) => {
  const onClick = () => {
    fetch(`/api/search?${queryString.stringify({
      q: 'rowen n'
    })}`)
      .then(result => {
        history.push('/result');
      })
      .catch(err => {
        history.push('/error')
      });
      startLoading();
  }
  return (
    <div className="home-page wrapper">
      {isloading && <ReactSpinner className='react-spinner'/>}
      <div className='search-box'>
        <input />
        <button onClick={onClick}>search</button>
      </div>
    </div>
  );
};


const enhance = compose(
  withState('isloading', 'setIsLoading', false),
  withHandlers({
    startLoading: ({ setIsLoading }) => () => setIsLoading(true),
    endLoading: ({ setIsLoading }) => () => setIsLoading(false)
  }))

export default enhance(Home);
