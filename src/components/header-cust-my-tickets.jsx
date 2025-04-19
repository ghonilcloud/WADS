import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
          <header className="header">
            <Link to="/cust-home"><h1 className="logo">Cottoneight</h1></Link>
            <div className="btn-group">
              <div className='btn-container'>
                <Link to="/submit-ticket"><button className="btn">Report Issues</button></Link>
                <Link to="/my-tickets"><button className="btn active">My Tickets</button></Link>
              </div>
              <Link to="/"><button className="btn logout">Log out</button></Link>
            </div>
          </header>
    );
  };
  
  export default Header;