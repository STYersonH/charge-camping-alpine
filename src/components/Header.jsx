import { useState } from "react";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";

import Avatar from "../img/avatar.png";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // para mostrar el menu que se despliega al tocar el incono de usuario
  const [isMenu, setIsMenu] = useState(false);
  const [user, setUser] = useState();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      setUser(providerData[0]);

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    setUser();
    localStorage.clear();
  };

  return (
    <header className="flex justify-around">
      <Link to={"/"} className="" onClick={() => setIsMenu(false)}>
        <p>Charge-System</p>
      </Link>

      <img
        className="w-10 h-10 cursor-pointer"
        src={user ? user.photoURL : Avatar}
        alt="userPicture"
        onClick={login}
      />
      <p
        onClick={logout}
        className={` cursor-pointer ${user ? "text-blue-500" : "text-red-500"}`}
      >
        cerrarSesion
      </p>
    </header>
  );
};

export default Header;
