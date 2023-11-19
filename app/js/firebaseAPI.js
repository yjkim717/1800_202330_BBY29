//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBcD87fkaT0KdKOj9Ypn9lmjBU7tV9gE8g",

    authDomain: "project-bby29.firebaseapp.com",
  
    projectId: "project-bby29",
  
    storageBucket: "project-bby29.appspot.com",
  
    messagingSenderId: "999076361078",
  
    appId: "1:999076361078:web:050dafb3e14e445fd68057"
  
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
