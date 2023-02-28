import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { arrayUnion, updateDoc, getDoc, doc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      setFavourites([]);
      console.log("favs" + favourites);
    } else {
      getUserFavourites();
    }
  }, [user]);

  const addToFavourites = async (movie) => {
    if (user?.email && !favourites.includes(movie.id)) {
      let newFavourites = [...favourites, movie.id];
      setFavourites(newFavourites);
      const movieRef = doc(db, "users", `${user?.email}`);
      await updateDoc(movieRef, {
        favourites: arrayUnion(movie.id),
      });
    }
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.includes(movie.id)) {
      let newWatchlist = [...watchlist, movie.id];
      setWatchlist(newWatchlist);
      console.log(movie.original_title + " added to watchlist");
      console.log(watchlist);
    }
  };

  const removeFromFavourites = async (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));

    const movieRef = doc(db, "users", `${user?.email}`);
    try {
      const movies = favourites.filter((mId) => mId !== movie.id);
      console.log("new favs: " + movies);
      await updateDoc(movieRef, {
        favourites: movies,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getUserFavourites = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(movieRef);
    const favourites = [];
    if (docSnap.exists()) {
      const dataSnapshop = docSnap.data();
      const fav = dataSnapshop.favourites;
      fav.forEach((f) => {
        favourites.push(f);
      });
    }
    setFavourites(favourites);
    console.log("favourites: " + favourites);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addToWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
