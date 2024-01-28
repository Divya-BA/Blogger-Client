import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './resetpassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { randomString } = useParams();
  const navigate = useNavigate();
  const URL = `http://localhost:3000/api`;

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const response = await axios.put(`${URL}/auth/resetpassword/${randomString}`, {
        password: newPassword,
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Error resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <div className='resetpassword-form'>
        <h2>Reset Password</h2>
        <input
          type="password"
          value={newPassword}
          placeholder='New Password...'
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          value={confirmPassword}
          placeholder='Confirm Password...'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleResetPassword}>Reset Password</button>
        
        <div className="page">
          New to Blogger!
          <Link to={"/register"} className="loginRegister">
            Register now
          </Link>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
