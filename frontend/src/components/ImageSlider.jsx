import React, { useEffect, useState } from "react";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import Vehicule from "./Vehicule";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();
  console.log("VEHICULELIST", vehicules);

  // React Slick settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    centerPadding: "0.2rem",
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    width: "100%",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
    // <div style={{ width: "100%", margin: "0 auto" }}>
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <Slider style={{ marginTop: "-2rem" }} {...sliderSettings}>
            {vehicules.map((vehicule) => {
              const imagesUrl = `http://localhost:5000/${vehicule.images[0].original}`;
              return (
                <Card key={vehicule._id}>
                  <Link to='/vehicules/all'>
                    <img
                      style={{
                        height: "25rem",
                        objectFit: "contain",
                      }}
                      src={imagesUrl}
                      alt={`${vehicule.brand}`}
                    />
                  </Link>
                </Card>
              );
            })}
          </Slider>
        </>
      )}
    </>
    // </div>
  );
};

export default ImageSlider;
