import React, { useState } from "react";
import Header from "../../components/header-admin-add-agent";
import './addAgent.css';
import { useNavigate } from 'react-router-dom';

function AddAgent() {
  const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
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
                Password
                <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter your password"/>
              </label>
            </>
          );
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted!", formData);
    };
    
  
    return (
      <div className="signup-page">
        <Header />
        <div className="signup-container">
        <h2>Add an Agent</h2>
        <div className="progress-circles">
          {[1, 2].map((circle, index) => (
              <React.Fragment key={circle}>
              <div className={`circle ${step === circle ? 'active' : ''} ${step > circle ? 'completed' : ''}`}>
                  {circle}
              </div>
              {index < 1 && <div className="line" />}
              </React.Fragment>
          ))}
          </div>
    
          <div className="form-card">
              <form onSubmit={handleSubmit}>
              {renderStep()}
              <div className="button-group">
                {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
                {step < 2 ? (
                    <button type="button" onClick={nextStep}>Next</button>
                ) : (
                  <button type="button" onClick={() => navigate("/users-roles")}>Submit</button>
                )}
                </div>
            </form>
          </div>
        </div>
      </div>
    );
};
export default AddAgent;