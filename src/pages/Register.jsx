import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useEffect } from "react";

const Register = () => {
  // obtener un provedor de google para la autenticacion
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, reducer] = useStateValue();
  const navigate = useNavigate();

  // funciones handle
  const handleIniciarSesion = async () => {
    // iniciar sesion
    if (!user) {
      // iniciar sesión
      await login();
    }
    console.log("user en handle: ", user);
    navigate("/");
  };

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      //establecer a nivel general el usuario
      await reducer({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div
        className="py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl cursor-pointer"
        onClick={() => handleIniciarSesion()}
      >
        Iniciar sesion
      </div>
    </div>
  );
};

export default Register;
