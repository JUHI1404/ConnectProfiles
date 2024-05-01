import { Button, List, Navbar  } from "flowbite-react";
import { NavbarComponent } from "./components/NavbarComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from "./pages/LoginPage/Login";
import { ListPage } from "./pages/list/ListPage";
import { useState } from "react";


function App() {
  const [openModal, setOpenModal] = useState(true)
  return (<Router>
    <Routes>
    <Route exact path="/" element={<MainPage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login openModal={openModal} setOpenModal={setOpenModal} />} />
    <Route path="/list" element={<ListPage />} />
    <Route path="/dashboard" element={<SignUp />} />
    </Routes>
  </Router>
  );
}
export default App;