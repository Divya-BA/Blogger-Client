import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './login.css'
import Spinner from "../../Components/spinner/Spinner";  // Import the Spinner component

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const URL = `http://localhost:3000/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URL}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login successful!");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error("Incorrect username or password");
      console.error(err);
    }
  };

  const handleDemoCredential = () => {
    // Set demo credentials in the input fields
    userRef.current.value = "linder";
    passwordRef.current.value = "1234567890";
  };

  return (
    <div className="login">
      {isFetching && <Spinner />} {/* Display the spinner if isFetching is true */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginTitle">Login</span>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your Username..."
          ref={userRef}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
        <button
          className="loginButton"
          type="button"
          onClick={handleDemoCredential}
        >
          Demo Credential
        </button>
        <div className="page">
          <Link to={"/forgotpassword"} className="loginRegister">
            Forgot Password!{" "}
          </Link>
        </div>
        <div className="page">
          New to Blogger!
          <Link to={"/register"} className="loginRegister">
            Register now
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
