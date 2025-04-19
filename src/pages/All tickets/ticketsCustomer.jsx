import Header from "../../components/header-cust-my-tickets";
import { Link } from 'react-router-dom';
import './ticketsAgent.css';
import React, { useState } from 'react';
import tickets from '../../data/tickets';


const TicketsCust = () => {
    const [filterStatus, setFilterStatus] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown(prev => !prev);
    };
  
    const filteredTickets = filterStatus
      ? tickets.filter(ticket => ticket.status === filterStatus)
      : tickets;
  
      const handleFilterClick = (status) => {
          setFilterStatus(status);
          setShowDropdown(false);
        };
  
    return (
      <>
        <Header />
        <div className="tickets-container">
          <h2 className="title">My Tickets</h2>
  
          <div className="filter-section">
              <div className="dropdown">
                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>Filter</span>
                  <svg className="arrow-down" width="12" height="12" viewBox="0 0 20 20" fill="none">
                      <path d="M5 8L10 13L15 8" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  </button>
                  {showDropdown && (
                  <ul className="dropdown-menu">
                      <li onClick={() => handleFilterClick('')}>All</li>
                      <li onClick={() => handleFilterClick('new')}>New</li>
                      <li onClick={() => handleFilterClick('open')}>Open</li>
                      <li onClick={() => handleFilterClick('resolved')}>Resolved</li>
                  </ul>
                  )}
              </div>
              </div>
  
  
          <div className="ticket-cards">
            {filteredTickets.map(ticket => (
              <div className="ticket-card" key={ticket.id}>
                <p className="subject">{ticket.subject}</p>
                <p className="date">{ticket.date}</p>
                <p className={`category ${ticket.categoryClass}`}>{ticket.category}</p>
                <p className="description">{ticket.description}</p>
                <p className={`status ${ticket.status}`}>{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</p>
                <Link to={`/ticket-cust/${ticket.id}`}><button className="view-btn">View</button></Link>
                </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
export default TicketsCust