import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header className="header">
        <Link to="/admin-home"><h1 className="logo">Cottoneight</h1></Link>
        <div className="btn-group">
          <div className='btn-container'>
            <Link to="/analytics"><button className="btn">Analytics</button></Link>
            <Link to="/users-roles"><button className="btn active">Users and Roles</button></Link>
            <Link to="/add-agent"><button className="btn">Add Agent</button></Link>
          </div>
          <Link to="/"><button className="btn logout">Log out</button></Link>
        </div>
      </header>
    );
  };
  
  export default Header;