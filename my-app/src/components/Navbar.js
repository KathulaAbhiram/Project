import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import {BsFillCalendarDateFill} from 'react-icons/bs';
import './Navbar.css';
import { useState } from 'react';
import {NavDropdown,Offcanvas} from 'react-bootstrap'

function Navbar() {
  const [showOff, setShowOff] = useState(false);
  const handleClose=()=>setShowOff(false);
  const handleShow=()=>setShowOff(true);
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <MdHome className='navbar-icon'/> <span className="navbar-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mycal">
            <BsFillCalendarDateFill className='navbar-icon'/><span className="navbar-text">Calendar</span>
          </Link>
        </li>
        <li className="nav-item">
          <NavDropdown title="Widgets" id="collasible-nav-dropdown" className='navbar-text'>
            <NavDropdown.Item>HTML</NavDropdown.Item>
            <NavDropdown.Item>CSS</NavDropdown.Item>
            <NavDropdown.Item>Reactjs</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Log Out</NavDropdown.Item>
          </NavDropdown>
        </li>
        <li className='nav-item'>
          <img src='https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg' alt='Profile' className='navbar-profile-image' onClick={handleShow}/>    
          <Offcanvas show={showOff} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>KMV_ABHIRAM</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h2>Unplatforms</h2>
              <p>FlashCard</p>
            </Offcanvas.Body>
          </Offcanvas>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

