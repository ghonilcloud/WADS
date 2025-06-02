import React, { useState, useEffect } from 'react';
import Header from "../../components/header-cust-submit-ticket";
import "./submitTicket.css";
import { useNavigate } from 'react-router-dom';
import authService from "../../services/authService";
import ticketService from "../../services/ticketService";

const SubmitTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const userData = await authService.getCurrentUser();
        
        // Check if user has customer role
        if (userData.role !== 'customer') {
          navigate('/login');
          return;
        }

        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUploadedFiles(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form data
      if (!formData.subject.trim()) {
        throw new Error("Subject is required");
      }
      if (!formData.category) {
        throw new Error("Category is required");
      }
      if (!formData.description.trim()) {
        throw new Error("Description is required");
      }

      // Prepare ticket data
      const ticketData = {
        subject: formData.subject,
        category: formData.category,
        description: formData.description
      };

      // Send API request using our ticketService
      const response = await ticketService.createTicket(ticketData, Array.from(uploadedFiles));
      
      if (!response) {
        throw new Error("Failed to submit ticket");
      }

      // Success handling
      setSuccess(true);
      setFormData({
        subject: "",
        category: "",
        description: "",
      });
      setUploadedFiles([]);

      // Redirect after short delay
      setTimeout(() => {
        navigate("/my-tickets");
      }, 2000);

    } catch (err) {
      console.error("Error submitting ticket:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <Header userData={userData} />
      <div className="submit-card">
        <h2>Report an Issue</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Ticket submitted successfully! Redirecting...</div>}

        <form onSubmit={handleSubmit}>
          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select category</option>
              <option value="Product Issues">Product Issues</option>
              <option value="Order and Shipping">Order and Shipping</option>
              <option value="Payment and Billing">Payment and Billing</option>
              <option value="Website Issues">Website Issues</option>
              <option value="Technical Support">Technical Support</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Other">Other</option>
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
              disabled={loading}
              required
            ></textarea>
          </label>

          <label>
            <span>Attachments (Optional)</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTicket;
