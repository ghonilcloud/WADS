// TicketDetails.js
import React, { useState } from 'react';
import './TicketDetails.css';

function TicketDetails({ ticket, onClose, onDelete, onUpdate }) {
  const [editedTitle, setEditedTitle] = useState(ticket.title);
  const [editedDescription, setEditedDescription] = useState(ticket.description);
  const [editedStatus, setEditedStatus] = useState(ticket.status);

  const handleSave = () => {
    onUpdate(ticket.id, editedTitle, editedDescription, editedStatus);
  };

  return (
    <div className="ticket-details">
      <div className="ticket-details-header">
        <h3>Ticket Details</h3>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="ticket-details-content">
        <div>
          <strong>Title:</strong>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div>
          <strong>Description:</strong>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </div>
        <div>
          <strong>Status:</strong>
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="ticket-actions">
          <button onClick={handleSave}>Save</button>
          <button className="delete-btn" onClick={() => onDelete(ticket.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
