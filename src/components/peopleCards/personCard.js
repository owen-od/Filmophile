import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PersonIcon from '@mui/icons-material/Person';
import { CssVarsProvider } from "@mui/joy/styles";

export default function PersonCard(props) {
  const person = props.person;
  return (
    <CssVarsProvider>
      <Card sx={{ minHeight: "280px", width: 215 }}>
        <CardCover>
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                : `${process.env.PUBLIC_URL}/assets/poster-placeholder.png`
            }
            srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <CardContent sx={{ justifyContent: "flex-end" }}>
          <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
            {person.name}
          </Typography>
          {person.character ? (
          <Typography
            startDecorator={<PersonIcon />}
            textColor="neutral.300"
          >
            As {person.character}
          </Typography>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </CssVarsProvider>
  );
}
