import React, { useState } from 'react';
import './App.css';
import TicketDetails from './TicketDetails';

function App() {
  const [tickets, setTickets] = useState([]);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleCreateTicket = () => {
    if (ticketTitle && ticketDescription) {
      const newTicket = {
        id: tickets.length + 1,
        title: ticketTitle,
        description: ticketDescription,
        status: 'Open',
      };
      setTickets([...tickets, newTicket]);
      setTicketTitle('');
      setTicketDescription('');
    }
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
    setSelectedTicket(null);
  };

  const handleUpdateTicket = (id, title, description, status) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id ? { ...ticket, title, description, status } : ticket
    ));
    setSelectedTicket(null);
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseTicketDetails = () => {
    setSelectedTicket(null);
  };

  // Separate tickets by status
  const openTickets = tickets.filter(ticket => ticket.status === 'Open');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'In Progress');
  const closedTickets = tickets.filter(ticket => ticket.status === 'Closed');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Help Desk Ticketing System</h1>
        <h2>Create and Manage Your Tickets</h2>
      </header>

      {selectedTicket ? (
        <TicketDetails
          ticket={selectedTicket}
          onClose={handleCloseTicketDetails}
          onDelete={handleDeleteTicket}
          onUpdate={handleUpdateTicket}
        />
      ) : (
        <div>
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

          <div className="ticket-list">
            <h3>Tickets</h3>
            <div className="ticket-columns">
              <div className="ticket-column">
                <h4>Open</h4>
                {openTickets.length === 0 ? (
                  <p>No open tickets.</p>
                ) : (
                  openTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-item">
                      <h4>{ticket.title}</h4>
                      <p>{ticket.description}</p>
                      <span className={`status ${ticket.status.toLowerCase()}`}>
                        Status: {ticket.status}
                      </span>
                      <br />
                      <button onClick={() => handleSelectTicket(ticket)}>View Details</button>
                    </div>
                  ))
                )}
              </div>

              <div className="ticket-column">
                <h4>In Progress</h4>
                {inProgressTickets.length === 0 ? (
                  <p>No tickets in progress.</p>
                ) : (
                  inProgressTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-item">
                      <h4>{ticket.title}</h4>
                      <p>{ticket.description}</p>
                      <span className={`status ${ticket.status.toLowerCase()}`}>
                        Status: {ticket.status}
                      </span>
                      <br />
                      <button onClick={() => handleSelectTicket(ticket)}>View Details</button>
                    </div>
                  ))
                )}
              </div>

              <div className="ticket-column">
                <h4>Closed</h4>
                {closedTickets.length === 0 ? (
                  <p>No closed tickets.</p>
                ) : (
                  closedTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-item">
                      <h4>{ticket.title}</h4>
                      <p>{ticket.description}</p>
                      <span className={`status ${ticket.status.toLowerCase()}`}>
                        Status: {ticket.status}
                      </span>
                      <br />
                      <button onClick={() => handleSelectTicket(ticket)}>View Details</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;