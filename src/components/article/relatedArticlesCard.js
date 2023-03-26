import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import Link from "@mui/joy/Link";
import { useMediaQuery } from "@mui/material";

export default function RelatedArticlesCard(props) {
  const { id } = props;
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      const articleRef = doc(db, "articles", `${id}`);
      const docSnap = await getDoc(articleRef);
      setArticle(docSnap.data());
    };
    getArticle();
  }, []);

  //set background image or placeholder if none
  const image = article.imageUrl
    ? article.imageUrl
    : `${process.env.PUBLIC_URL}/assets/background-placeholder.jpg`;

  const isNonMobile = useMediaQuery("(min-width:650px)");

  return (
    <CssVarsProvider>
      <Card variant="outlined" sx={{ width: isNonMobile ? "500px" : "300px" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={image} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
          <Link href={`/articles/${id}`} overlay underline="none">
            {article.mainTitle}
          </Link>
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          {article.mainSubtitle}
        </Typography>
      </Card>
    </CssVarsProvider>
  );
}
