import React, { useState } from "react";
// import { Flip } from "react-awesome-reveal";

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // <Flip>
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className='flip-card-inner'>
        <div className='flip-card-front'>
          <p>{front}</p>
        </div>
        <div className='flip-card-back'>
          <p>{back}</p>
        </div>
      </div>
    </div>
    // </Flip>
  );
};

export default FlipCard;
