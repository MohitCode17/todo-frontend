import { Link } from "react-router-dom";
import { Context } from "../main";
import { useContext, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);

  // Get Profile of User
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
    <div className="home">
      {isAuthenticated ? <h1>Welcome back, {user.name}</h1> : <h1>Welcome to Todos</h1>}
      {isAuthenticated ? (
        <Link to={"/todos"} className="button">
          Add Your Task
        </Link>
      ) : (
        <Link to={"/login"} className="button">
          Continue to Sign in
        </Link>
      )}
    </div>
  );
};

export default Home;
