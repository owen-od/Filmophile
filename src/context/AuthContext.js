import { createContext, useContext, useState, useEffect, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // this is used for image to update immediately in app when changed -see updateImage
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(user);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = (email, password) => {
    //create new user with Firebase authentication
    if (createUserWithEmailAndPassword(auth, email, password)) {
      //if success:
      //add new user entry to Firestore and create empty array for favs and watchlist
      setDoc(doc(db, "users", email), {
        favourites: [],
        watchlist: [],
      });
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateImage = (imageURL) => {
    updateProfile(auth.currentUser, {
      photoURL: imageURL
    }).then(() => {
      // console.log("Profile updated!")
      forceUpdate();
    }).catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, updateImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
