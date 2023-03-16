import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import VideocamIcon from "@mui/icons-material/Videocam";
import "@fontsource/pacifico";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { UserAuth } from "../../context/AuthContext";

const movieOptions = [
  { label: "Top", path: "/movies/top" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Popular", path: "/movies/popular" },
];

function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMovies, setAnchorElMovies] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMovieMenu = (event) => {
    setAnchorElMovies(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMovieMenu = () => {
    setAnchorElMovies(null);
  };

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <VideocamIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, ml: 1 }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "Pacifico",
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Filmophile
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {movieOptions.map((movie) => (
              <MenuItem>
                <NavLink
                  key={movie.label}
                  to={movie.path}
                  onClick={handleCloseNavMenu}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {movie.label}
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <VideocamIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "Pacifico",
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Filmophile
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexGrow: { xs: "0", md: "1" },
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Open Movies">
              <IconButton
                onClick={handleOpenMovieMenu}
                onMouseOver={handleOpenMovieMenu}
                sx={{ p: 0, mr: 2 }}
              >
                <Typography sx={{ color: "white", fontSize: "1.3rem" }}>
                  Movies
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElMovies}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElMovies)}
              onClose={handleCloseMovieMenu}
              MenuListProps={{ onMouseLeave: handleCloseMovieMenu }}
            >
              {movieOptions.map((movie) => (
                <MenuItem>
                  <NavLink
                    key={movie.label}
                    to={movie.path}
                    onClick={handleCloseMovieMenu}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {movie.label}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Search">
              <MenuItem component={Link} to={"/movies/search"}>
                <IconButton sx={{ p: 0, mr: 2, color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </MenuItem>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0, mr: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "/static/images/avatar/2.jpg"
                    }
                  />
                ) : (
                  <Avatar src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <div>
                  <MenuItem>
                    <NavLink
                      to="/account"
                      onClick={handleCloseUserMenu}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Account
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </div>
              ) : (
                <MenuItem>
                  <NavLink
                    to="/login"
                    onClick={handleCloseUserMenu}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </NavLink>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
