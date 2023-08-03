import "./header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const username = localStorage.getItem("username");
  const accessToken = localStorage.getItem("access_token");
  const [userDetails, setUserData] = useState({});
  const refreshToken = localStorage.getItem("refresh_token");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/header/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Include the token in the request headers
          },
        }); // Replace with your actual API endpoint to fetch user data
        setUserData(response.data);
        localStorage.setItem("username", response.data.username);

        // Assuming the response contains the user data object with the "username" field
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken && refreshToken) {
      fetchUserData();
    }
  }, [accessToken, refreshToken]);

  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} className="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Link
              to="/home"
              className="home"
              onClick={() => {
                const aboutSection = document.getElementById("home");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/home"
              className="home"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <li>About</li>
            </Link>
            <Link
              to="/home"
              className="home"
              onClick={() => {
                const aboutSection = document.getElementById("support");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <li>Support</li>
            </Link>

            {username ? (
              <Link to="/chat/profile">
                <Avatar
                  className="avatar-container"
                  name={username}
                  round={true}
                  size="50"
                  textSizeRatio={2}
                />
              </Link>
            ) : (
              <Link to="/auth/signin" className="signin">
                <li>SignIn</li>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
