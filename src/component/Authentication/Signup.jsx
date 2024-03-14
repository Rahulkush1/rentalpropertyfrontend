import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Action/userAction";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/userSlice";

function Signup() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success , error} = useSelector((state) => state.user);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const Register = (e) => {
    e.preventDefault();
    if (userData.password === userData.password2) {
      dispatch(registerUser({userData}));
    }
    else{
      toast.error("Password do not match", {
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
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      toast.success("Registered Successfully", {
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
    if(error){
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
  }, [dispatch, navigate, success,error,toast]);

  return (
    <>
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
      <div className="SignUpPage">
        <div id="login-box">
          <div className="left">
            <h1 className="my-3">Sign up</h1>
            <form onSubmit={Register}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInput}
                value={userData.username}
              />
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                onChange={handleInput}
                value={userData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
                value={userData.password}
              />
              <input
                type="password"
                name="password2"
                placeholder="Retype password"
                onChange={handleInput}
                value={userData.password2}
              />

              <input type="submit" name="signup_submit" value="Sign me up" />
            </form>
          </div>

          <div className="right">
            <span className="loginwith">
              Sign in with
              <br />
              social network
            </span>
            <Link to={"/login"}>
              <button className="social-signin gmail">Log in with Email</button>
            </Link>
            <button className="social-signin facebook">
              Log in with facebook
            </button>
            <button className="social-signin google">Log in with Google</button>
          </div>
          <div className="or">OR</div>
        </div>
      </div>
    </>
  );
}
export default Signup;
