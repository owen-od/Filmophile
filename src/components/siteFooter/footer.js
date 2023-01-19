import { Box, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import "@fontsource/righteous";

function Footer() {
  return (
    <Box
      marginTop="50px"
      padding="30px 0"
      sx={{ backgroundColor: "rgb(211, 211, 211, .3)" }}
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="25px"
        columnGap="clamp(25px, 35px, 45px)"
      >
        <Box width="clamp(30%, 35%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="15px"
            color="red"
            fontFamily="Righteous"
          >
            Filmophile
          </Typography>
          <div>
            Filmophile is your one-stop destination for all things cinema. We
            offer a vast collection of movies, including the latest releases and
            timeless classics. Browse through our selection, watch trailers,
            read comments, and create your own watchlist. Our user-friendly
            interface makes it easy to find the perfect movie for you. Discover
            the magic of the movies with us!
          </div>
        </Box>

        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="15px"
            fontFamily="Righteous"
          >
            About Us
          </Typography>
          <Typography mb="10px">About</Typography>
          <Typography mb="10px">Contact</Typography>
          <Typography mb="10px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="15px"
            fontFamily="Righteous"
          >
            Follow us
          </Typography>
          <Typography mb="10px" sx={{ display: "flex", alignItems: "center" }}>
            <TwitterIcon sx={{ color: "blue" }} />
            Twitter
          </Typography>
          <Typography mb="10px" sx={{ display: "flex", alignItems: "center" }}>
            <FacebookIcon sx={{ color: "blue" }} />
            Facebook
          </Typography>
          <Typography mb="10px" sx={{ display: "flex", alignItems: "center" }}>
            <InstagramIcon sx={{ color: "red" }} />
            Instagram
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default Footer;
