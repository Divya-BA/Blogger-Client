import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  function handleLogout() {
    dispatch({ type: "LOGOUT" })
    window.location.replace('/login')
  }

  return (
    <div className="top">
      
      <div className="topLeft">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
         
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            {
              user.profilePic &&
              <img
                className="topImg"
                src={user.profilePic}
                alt=""
              />
              ||
              <img
              className="topImg"
                src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                alt="" />
            }
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
           
          </ul>
        )}
      </div>
    </div>
  );
}