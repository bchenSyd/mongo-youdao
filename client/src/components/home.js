import React from "react";



const Home = ({history}) => {
  const onClick=()=>{
    history.push('/result');
  }
  return (
    <div className="home-page wrapper">
      <div className='search-box'>
        <input />
        <button onClick={onClick}>search</button>
      </div>
    </div>
  );
};

export default Home;
