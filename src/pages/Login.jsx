import { Link, Navigate } from "react-router-dom"
import "../styles/form.css";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../main";
import { useContext, useState } from "react";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Login Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      toast.success(data.message);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  };


  if(isAuthenticated) return <Navigate to={"/todos"} />

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <h2>SIGN IN</h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Your password"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Sign In</button>
        <p>
          Don't have account?{" "}
          <Link to={"/register"}>
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
