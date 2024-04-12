import React, { useEffect, useState } from "react";
import "./MiddlePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Action/userAction";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/userSlice";

function MiddlePage() {
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
      <div className="MiddlePage">
        <div className="center d-flex flex-column justify-content-center align-items-center">
          <Link to={"/signup?role=owner"}>
            <button className="owner-btn my-3">Owner</button>
          </Link>
          <Link to={"/signup?role=broker"}>
            <button className="broker-btn facebook my-3">Broker</button>
          </Link>
          <Link to={"/signup?role=buyer"}>
            <button className="buyer-btn google my-3">Buyer</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default MiddlePage;
