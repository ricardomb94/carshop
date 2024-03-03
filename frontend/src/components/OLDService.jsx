import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ service, imageUrl, index }) => {
  // Define an array of valid RGB colors (hex codes also work but need leading '#')
  const backgroundColors = [
    "rgb(3 4 139 34)", // Dark green
    // "rgb(218, 165, 32)", // Golden yellow
    "rgb(1 111 185)", // Dark blue
    "rgb(0 2 4)", // Black
    "rgb(195 43 162)",
  ];

  // Calculate color index using modulo (%) to ensure it stays within the array bounds
  const colorIndex = index % backgroundColors.length;
  console.log("COLORINDEX :", colorIndex);

  // Select background color and handle potential invalid data
  const backgroundColor = backgroundColors[colorIndex] || "rgba(238 238 238)"; // Default to light gray if background color is undefined

  console.log("BACKGROUND-COLOR :", backgroundColor);

  // Determine text color based on background luminance (assuming RGB format)
  const getTextColor = (bgColor) => {
    if (!bgColor || !/^\d{1,3}(,\s*\d{1,3}){2}$/.test(bgColor)) {
      console.error("Invalid RGB color format:", bgColor);
      return "black"; // Default if invalid or missing
    }

    const rgbValues = bgColor.split(",").map((v) => parseInt(v)); // Extract and convert RGB values

    const luminance =
      0.2126 * rgbValues[0] + 0.7152 * rgbValues[1] + 0.0722 * rgbValues[2];
    return luminance > 128 ? "black" : "white";
  };

  const textColor = getTextColor(backgroundColor);

  // Additional check for valid service data
  if (!service || !service._id || !service.title || !service.description) {
    console.error("Invalid service data:", service);
    return null; // Return null if service data is incomplete
  }

  return (
    <div>
      <Card className='my-3 p-3 service-card'>
        <Link to={`/services/${service._id}`}>
          <Card.Img
            src={imageUrl}
            className='service-image'
            variant='top'
            style={{ objectFit: "cover" }}
          />
        </Link>
        <Card.Body style={{ backgroundColor, color: textColor }}>
          <Link to={`/services/${service._id}`}>
            <Card.Title as='div' className='service-title'>
              <strong>{service.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text className='text-justify' as='p'>
            {service.description}
          </Card.Text>
          <a href='#' className='btn btn-primary'>
            en savoir +
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
