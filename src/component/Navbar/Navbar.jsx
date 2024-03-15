import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../../Slice/userSlice";
import { useGetUserDetailsQuery } from "../../services/auth/authService";
import { Link } from "react-router-dom";
import { useGetPropertiesQuery } from "../../services/auth/propertyService";
import { setProperty } from "../../Slice/propertySlice";

function Navbar() {
  const dispatch = useDispatch();
  const navVisibility =
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
      ? {
          position: "unset",
        }
      : {
          position: "sticky",
          top: "0",
          zIndex: "1020",
        };
  const { userInfo, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 20000,
  });
  const { data1, isloading } = useGetPropertiesQuery("properties", {
    pollingInterval: 20000,
  });

  const userlogout = () => {
    dispatch(logout());
  }
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
    if(data1){
        dispatch(setProperty(data1))
    }
  }, [dispatch, data, data1]);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-dark py-3 "
        style={navVisibility}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            RentalProperty
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link
                  className="nav-link active nav-link-ltr"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/properties"} className="nav-link nav-link-ltr">
                  Property
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link >
                      <Button
                        variant="outlined"
                        color="success"
                        style={{ color: "white" }}
                        onClick={userlogout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/login"}>
                      <Button
                        variant="outlined"
                        color="success"
                        style={{ color: "white" }}
                      >
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/signup"}>
                      <Button
                        variant="outlined"
                        color="success"
                        style={{ color: "white", marginLeft: "5px" }}
                      >
                        SignUp
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
