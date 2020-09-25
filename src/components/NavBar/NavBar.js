import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { BookingContext } from '../../App';
import logo from '../../images/Logo.png';

const NavBar = () => {
    const history = useHistory();
    const handleLogIN = () => {
        history.push('/login');
    }
    const [loggedInUser, setLoggedInUser] = useContext(BookingContext);
    const location = useLocation();
    const condition = location.pathname === "/" || location.pathname.includes("place");

    return (
        <Navbar expand="lg" className="container position-fixed fixed-top" bg={`${location.pathname.includes("booking") && "light"}`}>
            <Navbar.Brand to="/">
                <img
                    src={logo}
                    width="120px"
                    height="55px"
                    className={`logo ${condition && "logo-white"}`}
                    alt="not found"
                />
            </Navbar.Brand>
            {condition &&
                <Form inline>
                    <FormControl type="text" placeholder="Search your Destination..." className="mr-sm-2 ml-5 pr-5" />
                </Form>}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto nav-item">
                    <NavLink className={`mx-4 ${condition && "nav-text"}`} to="/">News</NavLink>
                    <NavLink className={`mx-4 ${condition && "nav-text"}`} to="/">Destination</NavLink>
                    <NavLink className={`mx-4 ${condition && "nav-text"}`} to="/">Blog</NavLink>
                    <NavLink className={`mx-4 ${condition && "nav-text"}`} to="/">Contact</NavLink>
                </Nav>
                {loggedInUser.email ?
                    <Button onClick={() => setLoggedInUser({})} variant="warning" className="px-4">Log Out {loggedInUser.name}</Button>
                    :
                    <Button onClick={handleLogIN} variant="warning" className="px-4">Log In</Button>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;