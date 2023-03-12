import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getTopMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "../api/movie-api";
import MovieCarousel from "../components/carousels/movieCarousel";
import MainCarousel from "../components/carousels/mainCarousel";
import { Box, useMediaQuery } from "@mui/material";
import Footer from "../components/siteFooter/footer";
import { CircularProgress } from "@mui/material";
import FeaturedArticleCard from "../components/article/featuredArticleCard";
import "@fontsource/righteous";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const HomePage = () => {
  const [articles, setLatestArticles] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:650px)");

  // get latest articles from Firestore when page renders
  useEffect(() => {
    const getArticles = async () => {
      const q = query(collection(db, "articles"));
      const querySnapshot = await getDocs(q);
      const articles = [];
      querySnapshot.forEach((doc) => {
        articles.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      setLatestArticles(articles);
    };
    getArticles();
  }, []);

  // top, upcoming and popular movies queries with useQuery to cache data
  const {
    data: topData,
    error: topError,
    isLoading: topIsLoading,
    isError: topIsError,
  } = useQuery(["topRated", { page: 1 }], getTopMovies);

  const {
    data: upcomingData,
    error: upcomingError,
    isLoading: upcomingIsLoading,
    isError: upcomingIsError,
  } = useQuery(["Upcoming", { page: 1 }], getUpcomingMovies);

  const {
    data: popularData,
    error: popularError,
    isLoading: popularIsLoading,
    isError: popularIsError,
  } = useQuery(["Popular", { page: 1 }], getPopularMovies);

  //check if any request still loading of if error
  const isLoading =
    topIsLoading || upcomingIsLoading || popularIsLoading || !articles;
  const isError = topError || upcomingError || popularError;
  const error = [topIsError, upcomingIsError || popularIsError];

  //return progress bar if page loading
  if (isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  //return error if there is an error
  if (isError) {
    return (
      <span>
        <h1>There was an error </h1>
        {error.map((e) => (e ? <h1>Error Message: {e.message}</h1> : null))}
      </span>
    );
  }

  //get top, poplular and upcoming movie data from query results
  const topMovies = topData.results;
  const upcomingMovies = upcomingData.results;
  const popularMovies = popularData.results;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCarousel />
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ backgroundColor: "primary.secondary" }}>
            <Typography
              color="primary.main"
              variant="h6"
              sx={{ fontFamily: "Righteous" }}
              align="center"
              p={1}
            ></Typography>
          </Grid>

          <Grid
            item
            xs={12}
            direction="row"
            alignItems="center"
            sx={{ paddingBottom: "5px" }}
          >
            <Box
              paddingRight={isNonMobile ? 10 : 3}
              paddingLeft={isNonMobile ? 10 : 3}
              paddingTop={5}
              paddingBottom={5}
            >
              <Typography
                color="primary.secondary"
                variant="subtitle2"
                fontFamily="Righteous"
                align="center"
              >
                Classic films
              </Typography>
              <Typography
                color="primary.secondary"
                variant="h4"
                fontFamily="Righteous"
                align="center"
                pb={3}
              >
                Explore the best
              </Typography>
              <MovieCarousel movies={topMovies}></MovieCarousel>
            </Box>

            <Grid container sx={{ backgroundColor: "background.accent" }}>
              <Grid item xs={12}>
                <Typography
                  color="primary.secondary"
                  variant="subtitle2"
                  pl={2}
                  fontFamily="Righteous"
                  align="left"
                  pt={10}
                >
                  Movie Stories and News
                </Typography>
                <Typography
                  color="primary.secondary"
                  variant="h4"
                  pl={2}
                  fontFamily="Righteous"
                  align="left"
                  pb={3}
                >
                  Explore our latest articles
                </Typography>
              </Grid>
              <Grid container spacing={4} pb={15}>
                {articles.map((article) => (
                  <FeaturedArticleCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </Grid>
            </Grid>

            <Box
              paddingRight={isNonMobile ? 10 : 3}
              paddingLeft={isNonMobile ? 10 : 3}
              paddingTop={5}
            >
              <Typography
                color="primary.secondary"
                variant="subtitle2"
                fontFamily="Righteous"
                align="center"
              >
                In the spotlight
              </Typography>
              <Typography
                color="primary.secondary"
                variant="h4"
                fontFamily="Righteous"
                align="center"
                pb={3}
              >
                See what's popular now
              </Typography>
              <MovieCarousel movies={popularMovies}></MovieCarousel>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            alignItems="center"
            sx={{ paddingBottom: "10px" }}
          >
            <Box
              paddingRight={isNonMobile ? 10 : 3}
              paddingLeft={isNonMobile ? 10 : 3}
              paddingTop={5}
            >
              <Typography
                color="primary.secondary"
                variant="subtitle2"
                fontFamily="Righteous"
                align="center"
              >
                Go to the movies
              </Typography>
              <Typography
                color="primary.secondary"
                variant="h4"
                pl={2}
                fontFamily="Righteous"
                align="center"
                pb={3}
              >
                Discover upcoming movies
              </Typography>
              <MovieCarousel movies={upcomingMovies}></MovieCarousel>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            alignItems="center"
            sx={{ padding: "10px" }}
          ></Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default HomePage;
