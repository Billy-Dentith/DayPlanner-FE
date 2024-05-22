import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyDYlf6ZGcQs8icXCLOzk4_JWvCwJILZosE',
    authDomain: "trip-planner-383f4.firebaseapp.com",
    projectId: "trip-planner-383f4",
    storageBucket: "trip-planner-383f4.appspot.com",
    messagingSenderId: "87868590631",
    appId: "1:87868590631:web:eadee437bc645ab32e9c02"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
