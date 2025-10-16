// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYUReS9ewDBt7aM4CJzMJ8oojCjhHHUTU",
  authDomain: "netflixgpt-87c3f.firebaseapp.com",
  projectId: "netflixgpt-87c3f",
  storageBucket: "netflixgpt-87c3f.firebasestorage.app",
  messagingSenderId: "863577403371",
  appId: "1:863577403371:web:bcabb0d012d6ab892873ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



