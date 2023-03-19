import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "@fontsource/righteous";

// imports all images from carousel assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context(
    "../../../public/assets/mainCarousel",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:650px)");

  //create headings for main carsousel - text smaller on small screen
  const isSmallScreen = useMediaQuery("(min-width:450px)");
  const heading1 = (
    <>
      <Typography variant={isSmallScreen ? "h2" : "h3"} fontFamily="Righteous">
        Discover story-worthy movie moments
      </Typography>
    </>
  );
  
  const heading2 = (
    <>
      <Typography variant={isSmallScreen ? "h2" : "h3"} fontFamily="Righteous">
        Take a trip down memory lane
      </Typography>
    </>
  );
  
  const heading3 = (
    <>
      <Typography variant={isSmallScreen ? "h2" : "h3"} fontFamily="Righteous">
        Join a community of filmophiles
      </Typography>
    </>
  );

  const headings = [heading1, heading2, heading3];

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: isSmallScreen ? "700px" : "500px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="15px"
            borderRadius="1px"
            textAlign="center"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top={isNonMobile ? "46%" : "30%"}
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? "10%" : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "300px"}
          >
            {headings[`${index}`]}
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
