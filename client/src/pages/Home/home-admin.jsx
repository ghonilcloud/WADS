import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/header-admin";
import AboutUs from "./components/aboutUs";
import Catalog from "./components/catalog";
import Footer from "./components/footer";
import authService from "../../services/authService";

const AdminHome = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const user = await authService.getCurrentUser();
        
        // Check if user has admin role
        if (user.role !== 'admin') {
          navigate('/login');
          return;
        }

        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <Header userData={userData} />
      <main>
        <Catalog />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default AdminHome;
