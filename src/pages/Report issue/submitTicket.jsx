import React, { useState } from 'react';
import Header from "../../components/header-cust-submit-ticket";
import "./submitTicket.css";
import { Link } from 'react-router-dom';

const SubmitTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
    file: null, // file is stored as a File object, not a string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // You can now send formData to your backend or API
  };

  return (
    <div className="submit-container">
      <Header />
      <div className="submit-card">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="product">Product Issues</option>
              <option value="shipping">Order and Shipping</option>
              <option value="payment">Payment and Billing</option>
            </select>
          </label>

          <label>
            <span>Description</span>
            <textarea
              name="description"
              placeholder="Enter detailed description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>

          <label>
            <span>Upload File (optional)</span>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
          <Link to="/cust-home"><button className="submit-btn">Submit</button></Link>          
        </form>
      </div>
    </div>
  );
};

export default SubmitTicket;
