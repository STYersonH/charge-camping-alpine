import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import { useStateValue } from "./context/StateProvider";
import Clients from "./pages/Clients";

function App() {
  const [{ user }] = useStateValue();

  return (
    <BrowserRouter>
      <Header />
      {/* <Routes>
        <Route path="/" element={<MainContainer />} />
      </Routes> */}
      {user && <Clients />}
    </BrowserRouter>
  );
}

export default App;
