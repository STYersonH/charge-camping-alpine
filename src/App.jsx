import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
