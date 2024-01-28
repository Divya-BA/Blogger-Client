import "./settings.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const URL = `http://localhost:3000/api`;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user._id,
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
      profilePic: profilePic || user.profilePic,
    };

    try {
      const res = await axios.put(`${URL}/user/` + user._id, payload);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      toast.success("Account updated successfully");
    } catch (error) {
      toast.error("Error updating account");
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = {
      userId: user._id,
    };

    try {
      await axios.delete(`${URL}/user/` + user._id, { data: data });
      dispatch({ type: "LOGOUT" });
      toast.success("Account deleted successfully");
      
    } catch (error) {
      toast.error("Error deleting account");
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
         
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            {user.profilePic ? (
              <img className="topImg" src={user.profilePic} alt="" />
            ) : (
              <img
                className="topImg"
                src="https://th.bing.com/th/id/OIP.ruat7whad9-kcI8_1KH_tQHaGI?w=1143&h=947&rs=1&pid=ImgDetMain"
                alt=""
              />
            )}
          </div>
          <label>Image URL</label>
          <input
            type="text"
            placeholder={user.profilePic}
            name="profilePic"
            value={profilePic}
            onChange={(e) => {
              setProfilePic(e.target.value);
            }}
          />
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="settingsSubmitButton"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
