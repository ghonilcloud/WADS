// TicketCreation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketCreation = ({ onCreateTicket }) => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleCreateTicket = () => {
    if (ticketTitle && ticketDescription) {
      const newTicket = {
        id: Date.now(), // Use Date.now() for a unique ID
        title: ticketTitle,
        description: ticketDescription,
        status: 'Open',
      };
      onCreateTicket(newTicket);
      navigate('/'); // Navigate back to the main page after creating a ticket
    }
  };

  return (
    <div className="ticket-form">
      <h3>Create New Ticket</h3>
      <input
        type="text"
        placeholder="Ticket Title"
        value={ticketTitle}
        onChange={(e) => setTicketTitle(e.target.value)}
      />
      <textarea
        placeholder="Ticket Description"
        value={ticketDescription}
        onChange={(e) => setTicketDescription(e.target.value)}
      />
      <button onClick={handleCreateTicket}>Create Ticket</button>
    </div>
  );
};

export default TicketCreation;