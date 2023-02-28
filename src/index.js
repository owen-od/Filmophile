import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MovieDetailsPage from "./pages/movieDetailsPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import TopMoviesPage from "./pages/topMoviesPage";
import UserPage from "./pages/userPage";
import SearchMoviesPage from "./pages/searchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMovies";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NavBar from "./components/navigation/navbar";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./protectedRoute";
import { CssBaseline } from "@mui/material";
import MoviesContextProvider from "./context/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const sample = {
  adult: false,
  backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
  belongs_to_collection: {
    id: 87096,
    name: "Avatar Collection",
    poster_path: "/uO2yU3QiGHvVp0L5e5IatTVRkYk.jpg",
    backdrop_path: "/iaEsDbQPE45hQU2EGiNjXD2KWuF.jpg",
  },
  budget: 460000000,
  genres: [
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 28,
      name: "Action",
    },
  ],
  homepage: "https://www.avatar.com/movies/avatar-the-way-of-water",
  id: 76600,
  imdb_id: "tt1630029",
  original_language: "en",
  original_title: "Avatar: The Way of Water",
  overview:
    "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
  popularity: 3427.076,
  poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  production_companies: [
    {
      id: 574,
      logo_path: "/iB6GjNVHs5hOqcEYt2rcjBqIjki.png",
      name: "Lightstorm Entertainment",
      origin_country: "US",
    },
    {
      id: 127928,
      logo_path: "/cxMxGzAgMMBhTXkcpYYCxWCOY90.png",
      name: "20th Century Studios",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2022-12-16",
  revenue: 1752000000,
  runtime: 192,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "Return to Pandora.",
  title: "Avatar: The Way of Water",
  video: false,
  vote_average: 7.72,
  vote_count: 4144,
};

const samplePerson = {
  adult: false,
  gender: 2,
  id: 74568,
  known_for_department: "Acting",
  name: "Chris Hemsworth",
  original_name: "Chris Hemsworth",
  popularity: 56.869,
  profile_path: "/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg",
  cast_id: 85,
  character: "Thor Odinson",
  credit_id: "62c8c25290b87e00f53973fb",
  order: 0,
};

const movies = [
  sample,
  sample,
  sample,
  sample,
  sample,
  sample,
  sample,
  sample,
  sample,
];

const cast = [
  samplePerson,
  samplePerson,
  samplePerson,
  samplePerson,
  samplePerson,
  samplePerson,
  samplePerson,
];

const App = () => {
  console.log(cast);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
        <MoviesContextProvider>
          <CssBaseline />
          <NavBar />
          <Routes>
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/movies/top" element={<TopMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/search" element={<SearchMoviesPage />} />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <UserPage movies={movies} />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);

//ReactDOM.render(<App />, document.getElementById("root")); //need to change this for react 18
