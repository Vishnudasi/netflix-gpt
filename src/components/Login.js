import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { CheckValidData } from "../utils/Validate";
import { auth } from "../utils/Firebase"; // ✅ import initialized auth
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";




import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    console.log(email.current.value);
    console.log(password.current.value);
    const message = CheckValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    //Sign In /Sign Up
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName:name.current.value,
            photoURL:"https://avatars.githubusercontent.com/u/217607007?v=4"
          })
            .then(() => {
              const{uid,email,displayName,photoURL}=auth.currentUser;
              dispatch(
                addUser({
                  uid:uid,
                  email:email,
                  displayName:displayName,
                  photoURL:photoURL,

              })

              )
              navigate("/browse")
              
            })
            .catch((error) => {
             setErrorMessage(error.message)
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.code, error.message);

          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In Logic
       signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="bg.jpg" alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-6 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-6 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="py-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
