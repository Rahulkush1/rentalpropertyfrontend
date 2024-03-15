import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, fetchUser } from "../../Slice/userSlice";
import { userLogin } from "../../Action/userAction";
import { toast } from "react-toastify";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { userInfo, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const HandleLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
  }, [isAuthenticated, navigate, toast, error,dispatch]);

  return (
    <>
      <div className="auth-container">
        <div className="home_page_banner2"></div>
        <div className="custom-shape-divider-top-1706701667">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 892.25 114.72 1200 0z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="LoginPage">
          <div id="login-box">
            <div className="left">
              <h1 className="my-3"> Login </h1>
              <form onSubmit={HandleSubmit}>
                <input
                  type="text"
                  name="email"
                  value={user.name}
                  placeholder="E-mail"
                  onChange={HandleLogin}
                />
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  onChange={HandleLogin}
                />

                <input type="submit" name="signup_submit" value="Login" />
              </form>
            </div>

            <div className="right">
              <span className="loginwith">
                Sign in with
                <br />
                social network
              </span>
              <Link to={"/signup"}>
                <button className="social-signin gmail">SignUp</button>
              </Link>
            </div>
            <div className="or">OR</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
