import React from "react";
import { Link } from "react-router-dom";
import { TokenUtil } from "../../../../util/TokenUtil";

const Home: React.FC = () => {
  return (
    <div>
      <div className="landing-page">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
            <p className="h3 display-1 text-light"></p>
            <div>
              {TokenUtil.isLoggedIn() ? (
                <Link to={"/products/fashion"} className="btn btn-success me-1">
                  Start Shoping
                </Link>
              ) : (
                <Link to={"/users/login"} className="btn btn-warning">
                  <i className="bi bi-lock-fill"></i>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
