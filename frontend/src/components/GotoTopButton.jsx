import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { TfiAngleDoubleUp } from "react-icons/tfi";

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

  const buttonStyles = {
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    backgroundColor: "#f9b233",
    borderRadius: "5px",
    padding: "0.5rem 0.75rem",
    cursor: "pointer",

    transition: "opacity 0.2s ease-in-out", // Smooth fade-in/out on scroll
    opacity: isVisible ? 1 : 0, // Hides button until scrolled past 100px
  };

  return (
    <Button style={buttonStyles} onClick={handleScrollToTop}>
      {/* <RxPinTop /> */}
      <TfiAngleDoubleUp />
      {/* <LiaFacebookF/> */}
    </Button>
  );
};

export default GotoTopButton;
