import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";
import Spinner from "../../Components/spinner/Spinner";  // Import the Spinner component

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // New state to track loading status

  // const URL = `http://localhost:3000/api`;
  const URL=`https://blogger-ba.onrender.com/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Set loading status to true
    try {
      const res = await axios.post(`${URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log(res);
      res.data && window.location.replace('/login');
      toast.success('Registration successful!');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <div className="register">
      {isSubmitting && <Spinner />} 
      <form className="registerForm" onSubmit={handleSubmit}>
        <span className="registerTitle">Register</span>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        <div className="page">
          Already a member?
          <Link to={'/login'} className="registerLogin">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
