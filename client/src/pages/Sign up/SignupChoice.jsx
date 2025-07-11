import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header-signup";
import "./signup.css";

const SignupChoice = () => {
    const navigate = useNavigate();

    const handleNormalSignup = () => {
        navigate('/signup/form');
    };

    return (
        <div className="signup-page">
            <Header />
            <div className="signup-choice-container">
                <h2>Choose Your Signup Method</h2>
                <div className="signup-options">
                    <button 
                        onClick={handleNormalSignup}
                        className="normal-signup-button"
                    >
                        Sign up with Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupChoice;
