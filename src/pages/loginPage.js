import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LoginForm from '../components/forms/loginForm';

export default function LoginPage() {

  //get random number in range to vary image on each page refresh
  const number = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  //assign image to variable based on random numer
  const image = `${process.env.PUBLIC_URL}/assets/login/cinema-${number}.jpg`;

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <LoginForm/>
      </Grid>
  );
}