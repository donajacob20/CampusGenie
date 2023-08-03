import "./home.css";
import { Image, Button, Container, Row, Col } from "react-bootstrap";
import frontpage from "../../assets/frontpage.png";
import chaticon from "../../assets/chaticon.png";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import { useNavigate } from 'react-router-dom';


function Homes() {
  const navigate = useNavigate();
  const Username=localStorage.getItem('username')
 
  const handleButtonClick = () => {
    if(!Username)
    {
      navigate("/auth/signin/");
    }
    else
    {
      navigate("/chat/dashboard");
    }
  };
  return (
    <div className="App">
      <header className="App-header"  id="home" style={{ backgroundColor: "#fcfcfc" }}>
        <div className="front-page">
          <Button variant="primary" className="button-overlay" onClick={handleButtonClick} >
            <span className="button-label">Ask genie</span>
            <Image className="button-icon" src={chaticon} fluid />
          </Button>
          <Image src={frontpage} fluid />
        </div>

        <Row className="text-center p-3" id="about">
          <h2 className="about-heading black-bold-text gap-between">About</h2>
          <p className="about-paragraph grey-text gap-between">
            Welcome to CampusGenie! Your go-to chatbot designed specifically for
            students. Whether you're a current student, prospective student, or 
            even a recent graduate, CampusGenie is here to assist you with any 
            college-related questions you may have. From admissions and course 
            selection to campus resources and student life, CampusGenie has 
            all the information you need.Our chatbot provides accurate and 
            personalized responses tailored to student needs.
            <br></br>
            <br></br>
            With a constantly updated knowledge base and the ability to learn
            from user interactions, CampusGenie stays up-to-date with the latest
            information and trends. Accessible through our website CampusGenie 
            is always just a chat away, providing you with the convenience and 
            efficiency you need in your student journey. 
            <br></br>
            <br></br>
            Experience the guidance and support of CampusGenie as you make the 
            most of your college experience.Your college experience starts here, 
            with CampusGenie - the ultimate genie for student success!
          </p>
        </Row>

        <Container>
          <Row>
            <Col xs={12} id="support">
              <h1 className="black-bold-text text-center mt-5">
                Support 
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center gap-between">
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon1} className="small-image" />
              </div>
              <h3 className="black-text">24/7 Support</h3>
              <p className="grey-text">
                Experience uninterrupted support and guidance right at your 
                fingertips.  
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon2} className="small-image" />
              </div>
              <h3 className="black-text">Products</h3>
              <p className="grey-text">
                Redefine the college experience with CampusGenie's AI-driven chatbot.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon3} className="small-image" />
              </div>
              <h3 className="black-text">Ratings</h3>
              <p className="grey-text">
                Rate your satisfaction, be the voice: Help us shine with your valuable ratings!
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center gap-between">
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon4} className="small-image" />
              </div>
              <h3 className="black-text">Safety</h3>
              <p className="grey-text">
                Your privacy secured, seamless assistance guaranteed.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon5} className="small-image" />
              </div>
              <h3 className="black-text">Chatbot</h3>
              <p className="grey-text">
                Delivers instant answers and guidance at your fingertips.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon6} className="small-image" />
              </div>
              <h3 className="black-text">Settings</h3>
              <p className="grey-text">
                Unleash the perfect chatbot experience with CampusGenie.
              </p>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Homes;
