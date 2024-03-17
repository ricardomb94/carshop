import React from "react";
import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const GotoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Show button after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className='go-to-top-button' onClick={handleScrollToTop}>
      Haut de page
      <FaArrowAltCircleUp />
    </button>
  );
};

export default GotoTopButton;
