import React from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";

const ArticleHeader = (props) => {
  const { title, subtitle, image } = props;

  //set background image if got from props, otherwise put placeholder
  const backgroundImage = image
    ? image
    : `${process.env.PUBLIC_URL}/assets/background-placeholder.jpg`;

  const isNonMobile = useMediaQuery("(min-width:650px)");
  // also check for small mobile screen as will need to remove text from heading if too small to fit
  const isNotSmallScreen = useMediaQuery("(min-width:415px)");
  const isNotSmallHeight = useMediaQuery("(min-height:1000px)");

  return (
    <>
      <Box
        item
        spacing={2}
        pt={9}
        mt={0.3}
        height="30vh"
        position="relative"
        sx={{
          "&::before": {
            content: "''",
            backgroundImage: `url(${backgroundImage})`,
            position: "absolute",
            backgroundSize: "cover",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
            opacity: 0.3,
          },
        }}
      >
        <Grid item align="center" xs={12}>
          <Typography
            variant={isNonMobile ? "h2" : "h3"}
            paddingTop={isNotSmallScreen ? "10px" : "8%"}
            fontFamily="Righteous"
          >
            {title}
          </Typography>
          {isNotSmallScreen && isNotSmallHeight ? (
            <Typography
              variant={isNonMobile ? "h5" : "h6"}
              color="text.primary"
              fontFamily="Righteous"
              sx={{ padding: 4 }}
            >
              {subtitle}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ArticleHeader;
