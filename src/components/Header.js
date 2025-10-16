import React from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut=()=>{
    signOut(auth)
      .then(() => {
       navigate("/")
      })
      .catch((error) => {
        navigate("/error")
      });
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src="logo.svg" alt="logo" />
      {user && (<div className="flex p-2">
        <img className="w-11 h-11" alt="usericon" src={user.photoURL} />
        <button onClick={handleSignOut}className="font-bold text-white">(Sign Out)</button>
      </div>
)}
    </div>
  );
} 

export default Header
