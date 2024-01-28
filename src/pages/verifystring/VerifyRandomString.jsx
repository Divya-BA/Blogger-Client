import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { MdOutlineVerified } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
import './verifyrandomstring.css';

function VerifyRandomString() {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const navigate = useNavigate();
  const { randomString } = useParams();
  // const URL=`http://localhost:3000`
  const URL=`https://blogger-ba.onrender.com/api`;

  useEffect(() => {
    async function verifyRandomString() {
      try {
        const response = await axios.get(
          `${URL}/api/auth/verifyRandomString/${randomString}`
        );

        if (response.data.message === "Random String Verified") {
          toast.success("Random String Verified Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerificationStatus("Random String Verified");
        } else {
          // If verification fails, display an error message
          setVerificationStatus("Random String Verification Failed");
          toast.error("Random String Verification Failed", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        // Handle API request error
        setVerificationStatus("Random String is Invalid or Expires");
        toast.error("Random String is Invalid or Expires", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }

    if (randomString) {
      verifyRandomString();
    }
  }, [randomString]);

  // Handle the "Continue" button click
  const handleContinueClick = () => {
    navigate(`/resetPassword/${randomString}`);
  };

  return (
    <div className="verify-random-string-container">
      <div className='verify'>
       <h2>{verificationStatus}</h2>
       <MdOutlineVerified className='icon'/>

       {verificationStatus === "Random String Verified" && (
              <button
                onClick={handleContinueClick}
                className="verifybutton"
              >
                Continue to Reset Password
              </button>
            )}
            </div>
    </div>
  );
}

export default VerifyRandomString;
