import Topbar from "./Components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import ForgotPassword from "./pages/forgotpassword/forgotPassword";
import VerifyRandomString from "./pages/verifystring/VerifyRandomString";
import ResetPassword from "./pages/resetpassword/ResetPassword";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Topbar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route
            path="/forgotpassword"
            element={user ? <Home /> : <ForgotPassword />}
          />
          <Route
            path="/verifyRandomString/:randomString"
            element={user ? <Home /> : <VerifyRandomString />}
          />
          <Route
            path="/resetpassword/:randomString"
            element={user ? <Home /> : <ResetPassword />}
          />

          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
