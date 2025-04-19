import Header from "../../components/header-agent-all-tickets";
import { Link } from 'react-router-dom';
import './ticketsAgent.css';
import React, { useState } from 'react';
import tickets from '../../data/tickets';

const TicketsAgent = () => {
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
        <h2 className="title">Submitted Tickets</h2>

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
                    <li onClick={() => handleFilterClick('pending')}>Pending</li>
                    <li onClick={() => handleFilterClick('on-hold')}>On Hold</li>
                    <li onClick={() => handleFilterClick('resolved')}>Resolved</li>
                </ul>
                )}
            </div>
            </div>


        <div className="ticket-cards">
          {filteredTickets.map(ticket => (
            <div className="ticket-card" key={ticket.id}>
              <div className="profile-section">
                <div className="avatar">👤</div>
                <div>
                  <h3>{ticket.name}</h3>
                  <p className="date">{ticket.date}</p>
                </div>
              </div>
              <p className="subject">{ticket.subject}</p>
              <p className={`category ${ticket.categoryClass}`}>{ticket.category}</p>
              <p className="description">{ticket.description}</p>
              <p><strong>Ticket Handler:</strong> <span className={ticket.handler === 'Not Assigned' ? 'not-assigned' : 'handler'}>{ticket.handler}</span></p>
              <p><strong>Priority:</strong> <span className={ticket.priorityClass}>{ticket.priority}</span></p>
              <p className={`status ${ticket.status}`}>{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</p>
              <Link to={`/ticket/${ticket.id}`}><button className="view-btn">View</button></Link>
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TicketsAgent;
