import React from "react";
import "./Header.css";
import logo from "../../logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Authentication/useAuth";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();
  console.log(auth);

  useEffect(() => {
    if(auth.user){
      fetch(`http://localhost:5000/checkAdmin/${auth.user.email}`)
      .then(res => res.json())
      .then( data => {
        setIsAdmin(data)
        sessionStorage.setItem("admin", data)
      })
    }
  },[auth.user])

  if (auth.user) {
    var style = {
      border: "none",
      backgroundColor: "white",
      marginLeft: "-40px",
    };
  } else {
    var style = {
      border: "none",
      backgroundColor: "white",
    };
  }

  return (
   <div className="container-fluid">
      <div className="d-flex justify-content-between">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="manageUser">
        <ul style={{ display: "flex" }}>
        {auth.user && (
            <li className="me-5">
              {" "}
              <span  style={{ color: "black" }}>
                <span style={{ color: "black" }}></span>
                {auth.user.name}
              </span>{" "}
            </li>
          )}
          <li>
            <NavLink to="/cart">
              <button style={style}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </NavLink>
          </li>
          {auth.user && (
            <li>
              <NavLink to="/user">
                <a className="text-dark">
                  Orders
                </a>
              </NavLink>
            </li>
          )}
          {/* {/* <li><a href="#" className="logIn">Login</a></li> */}
         

          <li>
            <NavLink to="/login">
              {auth.user ? (
                <a href="login" className="btn-danger signUpBtn">
                  Sign Out
                </a>
              ) : (
                <a href="login" className="btn-danger signUpBtn btnPostion">
                  Sign In
                </a>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
   </div>
  );
};

export default Header;
