import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import tickets from '../../data/tickets';
import './ticketDetail.css';
import Header from "../../components/header-cust-my-tickets";

const TicketDetailCust = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const toggleChatbox = () => setShowChatbox(prev => !prev);

  const { ticketId } = useParams();
  const ticket = tickets.find(t => t.id.toString() === ticketId);

  const navigate = useNavigate();

  if (!ticket) return <p>Ticket not found</p>;

  const categoryClass =
    ticket.category.toLowerCase().includes('late') ? 'late' :
    ticket.category.toLowerCase().includes('product') ? 'product-issues' :
    ticket.category.toLowerCase().includes('shipping') ? 'shipping' : '';

  const statusClass =
    ticket.status === 'New' ? 'new' :
    ticket.status === 'Open' ? 'open' :
    ticket.status === 'Pending' ? 'pending' :
    ticket.status === 'On Hold' ? 'on-hold' :
    ticket.status === 'Resolved' ? 'resolved' : '';

  return (
    <>
      <Header />
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

      <div className="ticket-detail">
        <div className="profile-section">
          <div className="avatar">👤</div>
          <div>
            <h3>John Doe</h3>
            <p className="ticket-id">Ticket ID #{ticket.id}</p>
          </div>
        </div>

        <h2 className='subject'>{ticket.subject}</h2>
        <p>Created {ticket.date} by John Doe</p>

        <p className={`category ${categoryClass}`}>{ticket.category}</p>
        <p>{ticket.description}</p>

        <p>
          <strong>Ticket Handler:</strong>{' '}
          <span className={ticket.handler === 'Not Assigned' ? 'not-assigned' : 'handler'}>
            {ticket.handler}
          </span>
        </p>

        <p>
          <span className={`status ${statusClass}`}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </p>
      </div>

      {/* Floating Chat Icon and Box */}
      <div className="chat-icon" onClick={toggleChatbox}>💬</div>

      {showChatbox && (
        <div className="chatbox-popup">
          <div className="chatbox-header">Customer Service Agent</div>
          <div className="chatbox-body">
            <div className="chat-message user">
              <p>Hi, how is the progress of my ticket?</p>
              <span className="chat-time">2:00 PM, Today</span>
            </div>
            <div className="chat-message agent">
              <p>Hello John, it will be processed soon.</p>
              <span className="chat-time">2:03 PM, Today</span>
            </div>
          </div>
          <div className="chatbox-input">
            <input type="text" placeholder="Type your message..." disabled />
            <button disabled>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketDetailCust;
