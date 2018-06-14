import React from "react";

const Record = props => {
  const { index, word, pronouncation, explaination } = props;
  return (
    <div>
      <div>{word}</div>
      <div>{pronouncation}</div>
      <div>
        <pre>{explaination}</pre>
      </div>
    </div>
  );
};

export default Record;
