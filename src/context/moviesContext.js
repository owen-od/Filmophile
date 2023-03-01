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
      setWatchlist([]);
      console.log("favs" + favourites);
    } else {
      getUserFavourites();
      getUserWatchlist();
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

  const addToWatchlist = async (movie) => {
    if (user?.email && !watchlist.includes(movie.id)) {
      let newWatchlist = [...watchlist, movie.id];
      setWatchlist(newWatchlist);
      const movieRef = doc(db, "users", `${user?.email}`);
      await updateDoc(movieRef, {
        watchlist: arrayUnion(movie.id),
      });
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

  const removeFromWatchlist = async (movie) => {
    setWatchlist(watchlist.filter((mId) => mId !== movie.id));

    const movieRef = doc(db, "users", `${user?.email}`);
    try {
      const movies = watchlist.filter((mId) => mId !== movie.id);
      console.log("new watchlist: " + movies);
      await updateDoc(movieRef, {
        watchlist: movies,
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

  const getUserWatchlist = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(movieRef);
    const watchlist = [];
    if (docSnap.exists()) {
      const dataSnapshop = docSnap.data();
      const list = dataSnapshop.watchlist;
      list.forEach((f) => {
        watchlist.push(f);
      });
    }
    setWatchlist(watchlist);
    console.log("watchlist: " + watchlist);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addToWatchlist,
        removeFromWatchlist,
        watchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
