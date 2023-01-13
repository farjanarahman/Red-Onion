import React from "react";
import "./GoogleSignIn.css";
import Auth from "./../useAuth";

const GoogleSignIn = () => {
  const auth = Auth();
  console.log(auth.signInWithGoogle);
  const handelSignIn = () => {
    auth.signInWithGoogle().then((res) => {
      window.location.pathname = "/cart";
      console.log("redirect now");
    });
  };
  console.log(auth.user);
  const handelSignOut = () => {
    auth.signOut().then((res) => {
      window.location.pathname = "/Login";
    });
  };
  return (
    <div className="container">
      <div className="row authArea">
        <div className="col-md-2"></div>
        <div className="col-md-8 mt-5 pt-5 ">
        {auth.user ? (
            <div>
              <button
                onClick={handelSignOut}
                className="text-center btn btn-danger"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <a
                className=" btn btn-outline-dark"
                role="button"
                onClick={handelSignIn}
              >
                <img
                  className="googleBtnImg"
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login with Google
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
