# Filmophile web application

Name: Owen O'Donnell 

## Overview

Inspired by a love of cinema, Filmophile is a web application for movie fans. With an emphasis on community, it offers tools for managing personal viewing, sharing opinions, discovering new titles and learning about film through curated editorial content and recommendations. Filmophile merges functionality, social interaction, and educational aspects, providing a comprehensive movie experience to users.

Built with React.js, Material UI, and Joy UI, the application is fully responsive. Firebase powers authentication and data storage, while the Movie Database API serves as the source of data on movies. The application is deployed using AWS Amplify.

The project was submitted as part of the requirements of the Higher Diploma in Computer Science in SETU. 

## Setup requirements

To use this project the first step is to clone the repository: 

+ Clone the repository with the following command: `git clone https://github.com/owen-od/filmophile`

You will then have to create .env file in your directory and add some details for Firebase and the TMDB api. 

First, as the web application uses the TMDB api key, you will need to get an API key. Then, add the below to your .env file: 

```
REACT_APP_TMDB_KEY=[Your API key]
FAST_REFRESH=false
```

Second, you must now set up a Firebase project and configure your app with your Firebase credentials. Follow these steps to do so:

+ Create a Firebase project on the Firebase console.
+ Enable Firebase Authentication, Firestore Database and Firebase Storage for the project.
+ Copy the Firebase config object from the Firebase console.
+ Add the values from this object to the .env file in the root directory of the project. 
+ Install Firebase dependencies by running npm install firebase.

Note that the Firebase config values at point 4 should look like the below in the .env file:

```
REACT_APP_FIREBASE_API_KEY=[Your value here]
REACT_APP_FIREBASE_AUTHDOMAIN=[Your value here]
REACT_APP_FIREBASE_PROJECTID=[Your value here]
REACT_APP_FIREBASE_STORAGEBUCKET=[Your value here]
REACT_APP_FIREBASE_MESSAGINGSENDERID=[Your value here]
REACT_APP_FIREBASE_APPID=[Your value here]
```

The firebase.js file in the project is already set up to grab these values. 

Now you can install all the other dependencies by running `npm install` 

Finally, you can now run the application by running `npm start`

## Features

The application currently includes the below features: 

- View sample of top, upcoming and popular movies on movie sliders on home page.
- View latest curated articles/features on home page.
- Read curated articles/content. View and navigate to movies associated with articles/content from article page. 
- View/navigate to associated articles from article page. 
- View all top, upcoming and popular movies on individual movie pages. 
- Navigate through top, upcoming and popular movies by page (which brings user back to top when page changed). 
- Search for movies based on text input.
- Sort movies based on a number of criteria, such as rating (asc and desc), release date (asc and desc), title. 
- Filter movies based on a number of criteria such as genre and rating. 
- View detailed information on movies such as description, genres, runtime, rating, cast.
- Watch trailer for movies in modal on movies pages.
- Check if movie streaming on common streaming platforms (currently support Netflix, Prime and Disney+)
- View related/recommended movies on each movie page. 
- Add comments on movies in comment feed on movie pages.
- View comments of other users on movies.
- Like comments of other users of movies.
- Add movies to favourites, which can be viewed on user page.
- Add movies to watchlist, which can be viewed on user page.
- Add user profile image.

## Graphics/UI

The below project image gives an example of the UI of the project. The application is also fully responsive and should work on all devices. 

![Project Image](/public/assets/projectImage.png)

## Test User

To test member features of the application without creating an account the below user details may be used: 

- Email: homer@simpson.com
- Password: secretpassword

## References

Below are some further references to resources consulted during development. 

- Movie Slider: [link](https://react-slick.neostack.com/docs/get-started)
  
- Text overflow: [link](https://stackoverflow.com/questions/63592567/material-ui-text-ellipsis-after-two-line)
  
- Home page carousel: [link](https://www.npmjs.com/package/react-responsive-carousel); [link](https://www.youtube.com/watch?v=EBCdyQ_HFMo&list=PLs0RSZipvGCQT-4MXO0bssf_mXCq3VfQu&index=2&ab_channel=EdRoh)
  
- Comment Box: [link](https://codesandbox.io/s/comment-box-with-material-ui-10p3c?file=/src/index.js:0-7705)

- Scrollbar: [link](https://stackoverflow.com/questions/53772429/mui-how-can-i-style-the-scrollbar-with-css-in-js)
  
- Forms: [link](https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/)
  
- Background image opacity: [link](https://coder-coder.com/background-image-opacity/)
  
- Input adornment: [link](https://stackoverflow.com/questions/58080512/how-to-add-a-button-on-the-right-of-the-textfield)

- Smooth scroll to top of page: [link](https://stackoverflow.com/questions/15935318/smooth-scroll-to-top)
  
- Additional MUI sample components: [link](https://mui.com/material-ui/getting-started/templates/)

- Firebase: [link](https://www.youtube.com/watch?v=PJCr_aoOv68&t=2424s&ab_channel=CodeCommerce); [link](https://www.youtube.com/watch?v=drF8HbnW87w&ab_channel=CodeCommerce)
  
## Project demo

A video demo of the project is available on Youtube at the following url [url]
