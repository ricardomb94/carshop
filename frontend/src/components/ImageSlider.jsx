import React, { useEffect, useState } from "react";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import Vehicule from "./Vehicule";
import { Card, Row, Col } from "react-bootstrap"; // Using a grid layout
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ScaleLoader } from "react-spinners";
// import "./ImageSlider.css"; // Add custom CSS for styling

// const baseUrl = process.env.BASE_URL || "";

const ImageSlider = () => {
  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();

  // React Slick settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    // centerPadding: "1.rem",
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <div className='loading-container'>
          <ScaleLoader
            // visible={true}
            height={40}
            width={5}
            color='#36d7b7'
            aria-label='scale-loading'
          />
        </div>
      ) : error ? (
        <p className='error-message'>Error fetching data: {error.message}</p>
      ) : (
        <Slider {...sliderSettings} className='vehicle-carousel'>
          {vehicules.map((vehicule) => {
            const imagesUrl = `/images/${vehicule.images[0].original}`;
            return (
              <Card key={vehicule._id} className='vehicle-card'>
                <Link to={`/vehicules/${vehicule._id}`}>
                  <LazyLoadImage
                    style={{
                      height: "25rem",
                      objectFit: "cover",
                    }}
                    alt={`${vehicule.brand}`}
                    src={imagesUrl}
                    effect='blur'
                  />
                </Link>
                {/* Add caption container here */}
                <div className='caption-container'>
                  {/* Add your caption content here */}
                  <p>
                    {vehicule.brand} - {vehicule.model}
                  </p>
                </div>
              </Card>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default ImageSlider;
