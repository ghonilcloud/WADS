import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AgentHome from "./pages/Home/home-agent";
import AdminHome from "./pages/Home/home-admin";
import CustHome from "./pages/Home/home-cust";
import TicketsAgent from "./pages/All tickets/ticketsAgent";
import TicketsCust from "./pages/All tickets/ticketsCustomer";
import Analytics from "./pages/Analytics/analytics";
import TicketDetail from "./pages/Specific tickets/ticketDetail"
import Users from "./pages/Users and roles/users"
import AddAgent from "./pages/Add agent/addAgent"
import TicketDetailCust from "./pages/Specific tickets/ticketDetailCust"
import SubmitTicket from "./pages/Report issue/submitTicket"
import Login from "./pages/Log in/login";
import Signup from "./pages/Sign up/signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agent-home" element={<AgentHome />} />
        <Route path="/cust-home" element={<CustHome />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/all-tickets" element={<TicketsAgent />} />
        <Route path="/my-tickets" element={<TicketsCust />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users-roles" element={<Users />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/ticket/:ticketId" element={<TicketDetail />} />
        <Route path="/ticket-cust/:ticketId" element={<TicketDetailCust />} />
        <Route path="/submit-ticket" element={<SubmitTicket />} />
      </Routes>
    </Router>
  );
}

export default App;