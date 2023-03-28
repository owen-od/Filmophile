import React from "react";
import Slider from "react-slick";
import MovieCard from "../movieCards/movieCard";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { IconButton, useMediaQuery } from "@mui/material";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//custom left arrow
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <IconButton
    onClick={props.onClick}
    sx={{
      position: "absolute",
      top: "40%",
      left: "-1.5%",
      zIndex: "10",
      opacity: ".5"
    }}
  >
    <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
  </IconButton>
);

// custom right arrow
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <IconButton
    onClick={props.onClick}
    sx={{
      position: "absolute",
      top: "40%",
      right: "0",
      zIndex: "10",
      opacity: ".5"
    }}
  >
    <ArrowCircleRightOutlinedIcon sx={{ fontSize: 40 }} />
  </IconButton>
);

const MovieCarousel = (movies) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: `{movies.length>8}`,
    speed: 750,
    centerMode: false,
    slidesToShow: 8,
    swipeToSlide: true,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 2220,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 2150,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          centerMode: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {movies.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Slider>
  );
};

export default MovieCarousel;
