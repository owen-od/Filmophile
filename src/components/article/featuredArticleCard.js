import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

function FeaturedArticleCard(props) {
  const article = props.article;

  //get date from Firebase timestamp saved with comment and format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = article.dateAdded.toDate().toLocaleDateString("en-IE", options);

  //set background image or placeholder if none
  const backgroundImage = article.imageUrl
    ? article.imageUrl
    : `${process.env.PUBLIC_URL}/assets/background-placeholder.jpg`;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
      <Link
            to={`/articles/${article.id}`}
            style={{ textDecoration: "none" }}
          >
        <Card sx={{ display: "flex", height: 250 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {article.mainTitle}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {article.mainSubtitle}
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary.main"
                sx={{ textDecoration: "none" }}
              >
                Continue reading...
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={backgroundImage}
            />
        </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedArticleCard;
