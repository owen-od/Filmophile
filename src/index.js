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
import { ThemeProvider, CssBaseline } from "@mui/material";
import MoviesContextProvider from "./context/moviesContext";
import { themeLight, themeDark } from "./theme";
import ArticlePage from "./pages/articlePage";
import "@fontsource/righteous";
import "@fontsource/pacifico";
import "@fontsource/satisfy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider theme={themeLight}>
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
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <UserPage />
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
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);

//ReactDOM.render(<App />, document.getElementById("root")); //need to change this for react 18
