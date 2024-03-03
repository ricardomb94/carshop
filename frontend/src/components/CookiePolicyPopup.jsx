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
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
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
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            padding: "0.5rem 1rem",
            marginTop: "1rem",
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
            borderRadius: "3px",
            padding: "0.5rem 1rem",
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
