import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const UserDetails = (props) => {
  const backgroundImage = `${process.env.PUBLIC_URL}/assets/watching.jpg`;

  const { user, updateImage } = UserAuth();
  const [file, setFile] = useState();

  useEffect(() => {
    const uploadImage = () => {
      const storageRef = ref(storage, `profile_images/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log("File available at", downloadURL);
            //the below function adds downloaded the URL to the user profile
            updateImage(downloadURL);
          });
        }
      );
    };
    file && uploadImage();
  }, [file]);

  return (
    <Grid
      container
      spacing={2}
      mt={0.3}
      position="relative"
      sx={{
        "&::before": {
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          position: "absolute",
          backgroundSize: "contain",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          opacity: 0.1,
        },
      }}
    >
      <Grid item align="center" xs={12}>
        <Typography variant="h4" component="p">
          {user.email}
        </Typography>
        <Avatar
          alt=""
          src={user.photoURL ? user.photoURL : "/static/images/avatar/2.jpg"}
          sx={{ width: 220, height: 220, mt: 2 }}
        ></Avatar>
      </Grid>
      <Grid item xs={12} align="center">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" align="center">
            Update Image
          </Button>
        </label>
      </Grid>
      <Grid item xs={6} align="center">
        <Typography variant="h4" component="p">
          {props.numberOfFavs}
        </Typography>
        <Typography variant="h5" component="p">
          Favourite Movies
        </Typography>
      </Grid>
      <Grid item xs={6} align="center">
        <Typography variant="h4" component="p">
          {props.numberWatchlist}
        </Typography>
        <Typography variant="h5" component="p">
          Movies in Watchlist
        </Typography>
      </Grid>
    </Grid>
  );
};
export default UserDetails;
