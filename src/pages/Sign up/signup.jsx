import React, { useState } from "react";
import "./signup.css";
import Header from "../../components/header-signup";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label>
              <span>First Name</span>
              <input type="text" name="firstName" onChange={handleChange} value={formData.firstName} placeholder="Enter your first name" />
            </label>
            <label>
            <span>Last Name</span>
              <input type="text" name="lastName" onChange={handleChange} value={formData.lastName} placeholder="Enter your last name" />
            </label>
          </>
        );
      case 2:
        return (
          <>
            <label>
              Email
              <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your first email" />
            </label>
            <label>
              Phone Number
              <input type="tel" name="phone" onChange={handleChange} value={formData.phone} placeholder="Enter your phone number" />
            </label>
          </>
        );
        case 3:
            return (
              <>
                <label>
                  Birth Date
                  <input
                    type="date"
                    name="birthDate"
                    onChange={handleChange}
                    value={formData.birthDate}
                  />
                </label>
                <label>
                  Gender
                  <select
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender || ""}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </>
            );          
      case 4:
        return (
          <>
            <label>
              Username
              <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Enter your username" />
            </label>
            <label>
              Password
              <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter your password"/>
            </label>
          </>
        );
      default:
        return <p>Thank you for signing up!</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    console.log("Form submitted!", formData);
  };

  const navigate = useNavigate();
  

  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="progress-circles">
        {[1, 2, 3, 4].map((circle, index) => (
            <React.Fragment key={circle}>
            <div className={`circle ${step === circle ? 'active' : ''} ${step > circle ? 'completed' : ''}`}>
                {circle}
            </div>
            {index < 3 && <div className="line" />} {/* Only render line between circles */}
            </React.Fragment>
        ))}
        </div>
  
        <div className="form-card">
            <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className={`button-group ${step === 1 ? 'full-width-button' : ''}`}>
              {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={step === 1 ? { flex: 1 } : {}}
                >
                  Next
                </button>
              ) : (
                <button type="button" onClick={() => navigate("/login")}>Submit</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default SignUp;
