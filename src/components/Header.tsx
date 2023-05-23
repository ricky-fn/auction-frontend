import React from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types'
import { FaUserCircle } from 'react-icons/fa';

import logo from '../assets/logo.svg';

const Header = () => {
  const isLoggedIn = useAuth();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    // Perform logout action, e.g., send API request
    // ...
  };

  return (
    <Navbar bg="dark" variant='dark'>
      <Container className="max-width-container">
      <Navbar.Brand as={Link} to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <Dropdown align='end'>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-user" className="d-flex align-items-center">
                  Balance: {user.balance}$&nbsp;&nbsp;<FaUserCircle size="30"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/create-item">
                    Create New Item
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/deposit">
                    Deposit
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/login">
              Username <FaUserCircle size="30"/>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;