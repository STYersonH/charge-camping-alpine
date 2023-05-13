import { useState } from "react";
// import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";

import Avatar from "../img/avatar.png";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  // obtener un provedor de google para la autenticacion
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, reducer] = useStateValue();
  const navigate = useNavigate();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      //establecer a nivel general el usuario
      reducer({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  const logout = () => {
    //quitar al usuario del nivel general
    reducer({
      type: actionType.SET_USER,
      user: null,
    });

    localStorage.clear();
    navigate("/auth");
  };

  return (
    <header className="flex justify-between p-3 items-center bg-gray-300">
      <Link to={"/"} className="" onClick={() => setIsMenu(false)}>
        <p>Charge-System</p>
      </Link>

      <div className="flex gap-4 items-center">
        <img
          className="w-7 h-7 cursor-pointer rounded-full"
          src={user ? user.photoURL : Avatar}
          alt="userPicture"
        />
        {user && console.log(user.uid)}
        {user && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-gray-400"
            onClick={logout}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        )}
      </div>
    </header>
  );
};

export default Header;
