import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import tickets from '../../data/tickets';
import './ticketDetail.css';
import Header from "../../components/header-agent-all-tickets";

const TicketDetail = () => {
    const [showChatbox, setShowChatbox] = useState(false);
    const toggleChatbox = () => setShowChatbox(prev => !prev);

  const { ticketId } = useParams();
  const ticket = tickets.find(t => t.id.toString() === ticketId);
  console.log("Ticket status:", ticket?.status);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState({
    ...ticket,
    priorityClass:
      ticket.priority === 'High' ? 'high' :
      ticket.priority === 'Low' ? 'low' :
      ticket.priority === 'Medium' ? 'medium' :
      ticket.priority === 'Critical' ? 'critical' : '',
    categoryClass:
      ticket.category.toLowerCase().includes('late') ? 'late' :
      ticket.category.toLowerCase().includes('product') ? 'product-issues' :
      ticket.category.toLowerCase().includes('shipping') ? 'shipping' : '',
    priorityColor: ticket.priority === 'Not Assigned' ? 'not-assigned' : '',
    statusClass: 
      ticket.status === 'new' ? 'new' :
      ticket.status === 'open' ? 'open' :
      ticket.status === 'pending' ? 'pending' :
      ticket.status === 'on hold' ? 'on-hold' :
      ticket.status === 'resolved' ? 'resolved' : '',
  });

  const navigate = useNavigate();

  if (!ticket) return <p>Ticket not found</p>;

  const handleChange = (field, value) => {
    setEditedTicket(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      const index = tickets.findIndex(t => t.id === ticket.id);
      if (index !== -1) {
        tickets[index] = { ...editedTicket };
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Header />
        <button className="back-btn" onClick={() => navigate(-1)}>
            Back
        </button>
      <div className="ticket-detail">
        <div className="profile-section">
          <div className="avatar">👤</div>
          <div>
            <h3>{editedTicket.name}</h3>
            <p className="ticket-id">Ticket ID #{editedTicket.id}</p>
          </div>
        </div>

        <h2 className='subject'>{editedTicket.subject}</h2>
        <p>Created {editedTicket.date} by {editedTicket.name}</p>

        {/* CATEGORY (e.g., shipping, late, etc.) */}
        <p className={`category ${editedTicket.categoryClass}`}>{editedTicket.category}</p>

        <p>{editedTicket.description}</p>

        {/* HANDLER (e.g., "Not Assigned") */}
        <p>
        <strong>Ticket Handler:</strong>{' '}
        {isEditing ? (
            <select
            value={editedTicket.handler}
            onChange={(e) => handleChange('handler', e.target.value)}
            >
            <option>Orlando Padiman</option>
            <option>Ariel Prandi</option>
            </select>
        ) : (
            <span className={editedTicket.handler === 'Not Assigned' ? 'not-assigned' : 'handler'}>
            {editedTicket.handler}
            </span>
        )}
        </p>

        {/* PRIORITY (high, low, etc.) */}
        <p>
        <strong>Priority:</strong>{' '}
        {isEditing ? (
            <select
            value={editedTicket.priority}
            onChange={(e) => {
                const priorityClass =
                e.target.value === 'High'
                    ? 'high'
                    : e.target.value === 'Low'
                    ? 'low'
                    : e.target.value === 'Medium'
                    ? 'medium' 
                    : e.target.value === 'Critical'
                    ? 'critical'
                    : '';
                const priorityColor =
                e.target.value === 'Not Assigned' ? 'not-assigned' : ''; 
                setEditedTicket(prev => ({
                ...prev,
                priority: e.target.value,
                priorityClass,
                priorityColor, 
                }));
            }}
            >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
            </select>
        ) : (
            <span className={`${editedTicket.priorityClass} ${editedTicket.priorityColor}`}>
            {editedTicket.priority}
            </span>
        )}
        </p>

        {/* STATUS (e.g., "Open", "In Progress", "Closed") */}
        <p>{' '}
        {isEditing ? (
            <select
            value={editedTicket.status}
            onChange={(e) => {
                const statusClass =
                e.target.value === 'Open'
                    ? 'open' 
                    : e.target.value === 'New'
                    ? 'new'
                    : e.target.value === 'Pending'
                    ? 'pending'
                    : e.target.value === 'On Hold'
                    ? 'on-hold'
                    : e.target.value === 'Resolved'
                    ? 'resolved'
                    : '';
                setEditedTicket(prev => ({
                ...prev,
                status: e.target.value,
                statusClass,
                }));
            }}
            >
            <option>New</option>
            <option>Open</option>
            <option>Pending</option>
            <option>On Hold</option>
            <option>Resolved</option>
            </select>
        ) : (
          <span className={`status ${editedTicket.statusClass}`}>
            {editedTicket.status.charAt(0).toUpperCase() + editedTicket.status.slice(1)}
          </span>
        )}
        </p>

        <button className="edit-btn" onClick={toggleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Floating Chat Icon and Box */}
        <div className="chat-icon" onClick={toggleChatbox}>💬</div>

        {showChatbox && (
        <div className="chatbox-popup">
            <div className="chatbox-header">John Doe</div>
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

export default TicketDetail;
