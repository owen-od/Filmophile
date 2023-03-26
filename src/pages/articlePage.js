import React, { useState, useEffect } from "react";
import { useQueries } from "react-query";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/siteFooter/footer";
import { getMovie } from "../api/movie-api";
import "@fontsource/righteous";
import ArticleHeader from "../components/article/articleHeader";
import MovieCarousel from "../components/carousels/movieCarousel";
import { useParams } from "react-router-dom";
import RelatedArticlesCard from "../components/article/relatedArticlesCard";
import { ExpandMore } from "@mui/icons-material";

const ArticlePage = (props) => {
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const isNonMediumScreen = useMediaQuery("(min-width:900px)");

  const [article, setArticle] = useState({});
  //get article id from url to retrive correct article from Firestore
  const { id } = useParams();
  //state to toggle related article section of page
  const [more, setMore] = useState(false);

  //get article from Firestore when page renders
  useEffect(() => {
    const getArticle = async () => {
      const articleRef = doc(db, "articles", `${id}`);
      const docSnap = await getDoc(articleRef);
      setArticle(docSnap.data());
    };
    getArticle();
  }, []);

  //create movies array from returned article movies - init first to avoid error
  let movies = [];
  if (article.movies) {
    movies = article.movies;
  }

  //movie queries from array of movies
  const movieQueries = useQueries(
    movies.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  //check if requests are still loading
  const isLoading = movieQueries.find((m) => m.isLoading === true);

  // display loading progress bar until movie ids returned from Firebase and got from API
  if (!article.movies || isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  //get movies to display
  const displayedMovies = movieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  //get date from Firebase timestamp saved with comment and format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = article.dateAdded.toDate().toLocaleDateString("en-IE", options);

  //open or close end section to page
  function handleClick() {
    setMore(!more);
  }

  return (
    <>
      <ArticleHeader
        title={article.mainTitle}
        subtitle={article.mainSubtitle}
        image={article.imageUrl}
      />
      <Grid container spacing={1}>
        <Grid
          item
          align="center"
          xs={12}
          md={2}
          minHeight="100%"
          maxWidth="100%"
          sx={{ mt: 3 }}
        >
          <Avatar
            sx={{ width: 150, height: 150, mt: 2 }}
            src={
              article.authorImageUrl
                ? `${article.authorImageUrl}`
                : `${process.env.PUBLIC_URL}/assets/poster-placeholder.png`
            }
          ></Avatar>
          <Typography variant="subtitle2" sx={{ padding: 1 }}>
            By: {article.author}
          </Typography>
          <Typography variant="subtitle2">{date}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          pr={isNonMediumScreen ? 10 : 0}
          display="flex"
          flex-wrap="wrap"
          justifyContent="center"
          gap="30px"
          mt={3}
        >
          <Grid item>
            <Typography
              variant="h6"
              align="center"
              pb={2}
              sx={{ paddingTop: 1, fontFamily: "Righteous" }}
            >
              {article.heading1}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              sx={{ paddingRight: 2, paddingLeft: 2, paddingBottom: 4 }}
            >
              {article.text1}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              pb={1}
              sx={{ fontFamily: "Righteous" }}
            >
              {article.heading2}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              sx={{ paddingRight: 2, paddingLeft: 2, paddingBottom: 5 }}
            >
              {article.text2}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} alignItems="center" sx={{ paddingBottom: "10px" }}>
        <Box
          paddingRight={isNonMobile ? 10 : 3}
          paddingLeft={isNonMobile ? 10 : 3}
          paddingTop={5}
          paddingBottom={5}
        >
          <Typography
            color="primary.secondary"
            variant="subtitle2"
            pl={2}
            fontFamily="Righteous"
            align="left"
            pt={0}
          >
            Explore the movement
          </Typography>
          <Typography
            color="primary.secondary"
            variant="h5"
            pl={2}
            fontFamily="Righteous"
            align="left"
            pb={1}
          >
            Featured Movies:
          </Typography>
          <MovieCarousel movies={displayedMovies}></MovieCarousel>
        </Box>
      </Grid>
      <Grid container xs={12} justifyContent="center" alignItems="center">
        <Button onClick={handleClick}>
          <Typography
            fontFamily="Righteous"
            mb="10px"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton aria-label="more" size="large">
              <ExpandMore fontSize="inherit" />
            </IconButton>
            See more
          </Typography>
        </Button>
      </Grid>
      {more && (
        <Grid
          container
          xs={12}
          pt={5}
          pb={5}
          display="flex"
          flex-wrap="wrap"
          justifyContent="center"
          sx={{ backgroundColor: "background.accent" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              pb={2}
              fontFamily="Righteous"
            >
              Explore related articles
            </Typography>
          </Grid>
          {article.relatedArticles.map((articleId, key) => (
            <Grid item p={3}>
              <RelatedArticlesCard id={articleId} index={key} />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default ArticlePage;
