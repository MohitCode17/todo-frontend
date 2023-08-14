import { Link } from 'react-router-dom';
import "../styles/header.css";
import { useContext } from 'react';
import { Context } from '../main';
import { FiLogOut } from "react-icons/fi"
import axios from 'axios';
import { server } from '../server';
import { toast } from 'react-hot-toast';

const Header = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const logoutHandler = async () => {
    try {
      const {data} = await axios.get(`${server}/user/logout`, {withCredentials: true});
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    };
  };

  return (
    <header className='header'>
      <img src="./logo.svg" alt="todos-logo" width={100} />
      <nav className='nav'>
        <Link to={"/"} >Home</Link>
        {isAuthenticated ? <button className='logout' onClick={logoutHandler} >Logout <FiLogOut/></button> : <Link to={"/login"} >Sign In</Link>}
      </nav>
    </header>
  )
}

export default Header