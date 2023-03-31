import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  arrayUnion,
  updateDoc,
  getDoc,
  doc,
  Timestamp,
  setDoc,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  //user favourite movie state
  const [favourites, setFavourites] = useState([]);
  //user watchlist state
  const [watchlist, setWatchlist] = useState([]);
  //user liked comments state
  const [likes, setLikes] = useState([]);
  //get user from authContext
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      setFavourites([]);
      setWatchlist([]);
      setLikes([]);
    } else {
      getUserFavourites();
      getUserWatchlist();
      getUserLikes();
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

  const addComment = async (movie, comment) => {
    if (user?.email) {
      let newComment = {
        user: user.email,
        dateAdded: Timestamp.now(),
        comment: comment,
        likes: 0,
        id: uuidv4(),
      };
      if (user.photoURL) {
        newComment.userPhotoUrl = user.photoURL;
      }
      await setDoc(
        doc(db, "movies", `${movie.movie?.id}`),
        {
          comments: arrayUnion(newComment),
        },
        { merge: true }
      );
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
      //console.log(movie.original_title + " added to watchlist");
      //console.log(watchlist);
    }
  };

  const removeFromFavourites = async (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
    const movieRef = doc(db, "users", `${user?.email}`);
    try {
      const movies = favourites.filter((mId) => mId !== movie.id);
      //console.log("new favs: " + movies);
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
      //console.log("new watchlist: " + movies);
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
      if (fav.length > 0) {
        fav.forEach((f) => {
          favourites.push(f);
        });
      }
      setFavourites(favourites);
    }
  };

  const getUserLikes = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(movieRef);
    const likes = [];
    if (docSnap.exists()) {
      const dataSnapshop = docSnap.data();
      const l = dataSnapshop.likes;
      if (l.length > 0) {
        l.forEach((like) => {
          likes.push(like);
        });
      }
      setLikes(likes);
    }
  };

  const getUserWatchlist = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(movieRef);
    const watchlist = [];
    if (docSnap.exists()) {
      const dataSnapshop = docSnap.data();
      const list = dataSnapshop.watchlist;
      if (list.length > 0) {
        list.forEach((f) => {
          watchlist.push(f);
        });
      }
      setWatchlist(watchlist);
    }
  };

  const getLatestArticles = async () => {
    const q = query(collection(db, "articles"));
    const querySnapshot = await getDocs(q);
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
      return articles;
    });
  };

  const incrementCommentLikes = async (movieId, commentIndex, commentId) => {
    const movieRef = doc(db, "movies", movieId.toString());
    const movieDoc = await getDoc(movieRef);

    if (movieDoc.exists()) {
      const movieData = movieDoc.data();
      const comments = movieData.comments;
      // Check that the comments property is an array before calling forEach on it - would throw error before this
      if (Array.isArray(comments)) {
        comments.forEach((comment, index) => {
          if (index === commentIndex) {
            comment.likes += 1;
          }
        });
        // Update the comments array in the movie document
        await updateDoc(movieRef, {
          comments: comments,
        });
      }
    }
    addToLikes(commentId);
  };

  const decreaseCommentLikes = async (movieId, commentIndex, commentId) => {
    const movieRef = doc(db, "movies", movieId.toString());
    const movieDoc = await getDoc(movieRef);

    if (movieDoc.exists()) {
      const movieData = movieDoc.data();
      const comments = movieData.comments;
      // Check that the comments property is an array before calling forEach on it - would throw error before this
      if (Array.isArray(comments)) {
        comments.forEach((comment, index) => {
          if (index === commentIndex) {
            comment.likes -= 1;
          }
        });
        // Update the comments array in the movie document
        await updateDoc(movieRef, {
          comments: comments,
        });
      }
    }
    removeFromLikes(commentId);
  };

  const addToLikes = async (commentId) => {
    if (user?.email && !likes.includes(commentId)) {
      let newLikes = [...likes, commentId];
      setLikes(newLikes);
      const movieRef = doc(db, "users", `${user?.email}`);
      await updateDoc(movieRef, {
        likes: arrayUnion(commentId),
      });
    }
  };

  const removeFromLikes = async (commentId) => {
    setLikes(likes.filter((cId) => cId !== commentId));
    const movieRef = doc(db, "users", `${user?.email}`);
    try {
      const likedComments = likes.filter((cId) => cId !== commentId);
      await updateDoc(movieRef, {
        likes: likedComments,
      });
    } catch (e) {
      console.log(e);
    }
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
        addComment,
        getLatestArticles,
        incrementCommentLikes,
        decreaseCommentLikes,
        likes,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
