import { Link, Navigate } from "react-router-dom";
import "../styles/form.css";
import { useContext, useState } from "react";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-hot-toast";
import { Context } from "../main";

const Register = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Register Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          name,
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
    <section className="register">
      <form onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <input
          type="text"
          placeholder="Enter your name"
          required
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
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
        <button type="submit">Sign Up</button>
        <p>
          Alreay a user? <Link to={"/login"}>Sign In</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
