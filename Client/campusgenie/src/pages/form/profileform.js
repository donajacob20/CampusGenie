import { Container, Row, Col } from 'react-bootstrap';
import './profileform.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';

const ProfileForm = () => {
  const [userData, setUserData] = useState({});
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const email = localStorage.getItem("email");
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const username = localStorage.getItem("username");
  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Include the token in the request headers
          }
        }); // Replace '/api/user' with your backend endpoint
        setUserData(response.data);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("lastname", response.data.lastname);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (accessToken && refreshToken) {
      fetchData();
    }

  }, [accessToken, refreshToken]);

  return (
    <Container className="profile-outer-box" fluid>
      <Row>
        <Col>
          <span className="profile-text">Profile</span>
        </Col>
      </Row>
      <Row className="profile-image" style={{ margin: '0 auto', marginTop: '8rem' }}>
        <div className='center-container'>
          {username && (
            <Avatar
              name={username}
              round={true}
              size="100"
              textSizeRatio={2}
            />
          )}
        </div>
      </Row>

      <Row >

        <Container style={{ marginTop: '23px' }}>
          <p style={{ fontweight: 'bold', fontSize: '24px', color: '#000000', fontFamily: 'Poppins', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>{firstname} {lastname}</p>
        </Container>

      </Row>
      <Container className='together-container' style={{ marginTop: "10px", marginRight: "75%", marginLeft: "-30px", marginBottom: "100px" }} fluid >
        <Row>
          <Col>
            <span className="username-text" >Username</span>
          </Col>
          <Col >
            <Container className="username-container" fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ fontweight: 400, fontSize: '15px', color: '#8C8C8C', fontFamily: 'Poppins', paddingLeft: '2rem' }}> {username}</p>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="username-text">Email id</span>
          </Col>
          <Col >
            <Container className="email-container" fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ fontweight: 400, fontSize: '15px', color: '#8C8C8C', fontFamily: 'Poppins', paddingLeft: '2rem' }}> {email}</p>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ProfileForm;