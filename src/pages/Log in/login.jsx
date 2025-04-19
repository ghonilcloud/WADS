import React from "react";
import "./login.css";
import Header from "../../components/header-login";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <div className="login-card">
        <h2>Log In</h2>
        <form>
          <label>
            <span>Username</span>
            <input type="text" placeholder="Enter your username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" placeholder="Enter your password" />
          </label>
          <Link to="/agent-home"><button className="login-button">Log in as Agent</button></Link>
          <Link to="/cust-home"><button className="login-button">Log in as Customer</button></Link>
          <Link to="/admin-home"><button className="login-button">Log in as Administrator</button></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;