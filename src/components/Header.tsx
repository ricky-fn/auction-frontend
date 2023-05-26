import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';

import logo from '../assets/logo.svg';
import { logout } from '../store/userActions';
import { setLoading } from '../store/appActions';
import { RootState } from '../store';

const Header = () => {
  const isLoggedIn = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const { logoutEndpoint } = useSelector((state: RootState) => state.endpoints);
  const handleLogout = () => {
    dispatch(setLoading(true))
    // Make API request to logoutEndpoint
    axios.post(logoutEndpoint).then(() => {
      dispatch(logout());
      navigate('/')
    }).finally(() => {
      dispatch(setLoading(false))
    });
  };

  return (
    <Navbar bg="dark" variant='dark'>
      <Container className="max-width-container">
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <>
                <Dropdown align='end'>
                  <Dropdown.Toggle as={Nav.Link} id="dropdown-user" className="d-flex align-items-center">
                    Balance: {user.balance}$&nbsp;&nbsp;<FaUserCircle size="30" />
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
                Username <FaUserCircle size="30" />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;