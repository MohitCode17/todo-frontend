import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import { server } from "./server";

const App = () => {
  const { setUser, setIsAuthenticated } = useContext(Context);

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/user/getProfile`, {
        withCredentials: true,
      });
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
