import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./forgotpassword.css";
import Spinner from "../../Components/spinner/Spinner"; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const URL = `http://localhost:3000/api`;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);  
    try {
      const response = await axios.post(`${URL}/auth/forgotpassword`, {
        email: email,
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error('Error sending forgot password request:', error);

      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="forgotPassword">
      {isLoading && <Spinner />} 
      <form className="forgotPasswordForm" onSubmit={handleForgotPassword}>
        <span className="forgotPasswordTitle">Forgot Password</span>
        <input
          className="forgotPasswordInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="forgotPasswordButton" type="submit">
          Reset Password
        </button>
        <div className="page">
          New to Blogger!
          <Link to={"/register"} className="loginRegister">
            Register now
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default ForgotPassword;
