import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

const CookiePolicyPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  // Initialize cookies object using useMemo
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    const cookiePolicyAccepted = cookies.get("cookiePolicyAccepted");
    if (cookiePolicyAccepted) {
      setShowPopup(false);
    }
  }, [cookies]); // Add cookies to the dependency array

  const handleAccept = () => {
    cookies.set("cookiePolicyAccepted", true, { path: "/" });
    setShowPopup(false);
  };
  const handleRefuse = () => {
    cookies.set("cookiePolicyAccepted", false, { path: "/" });
    setShowPopup(false);
  };
  return (
    showPopup && (
      <div
        className='cookie-policy-popup'
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "20px",
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <p>
          En poursuivant votre navigation sur ce site, vous acceptez
          l'utilisation de cookies pour vous proposer des contenus et services
          adaptés à vos centres d'intérêts.{" "}
          <a href='/cookie-policy'>En savoir plus</a>
        </p>
        <button
          onClick={handleAccept}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Accepter
        </button>
        <button
          onClick={handleRefuse}
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Refuser
        </button>
      </div>
    )
  );
};

export default CookiePolicyPopup;
