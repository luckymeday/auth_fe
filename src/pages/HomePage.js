import React, { useState, useEffect } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

export default function Homepage() {
  const user = localStorage.getItem("user");
  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);
  const history = useHistory();

  const handleLogout = async () => {
    console.log("logout:");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/coverletter">
        Coverletter
      </Nav.Link>

      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <div>
      <h1>Home page </h1>
      <Navbar>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {isAuthenticated === true ? authLinks : publicLinks}
        </Navbar.Collapse>
      </Navbar>

      <Button
        variant="dark"
        style={{
          fontSize: "17px",
          fontFamily: "Montserrat, sansSerif",
          marginBottom: "5rem",
          backgroundColor: "#F57F5B",
          border: "none",
        }}
        onClick={() => history.push(`/coverletter`)}
      >
        See Jeesun's CV
      </Button>
    </div>
  );
}
