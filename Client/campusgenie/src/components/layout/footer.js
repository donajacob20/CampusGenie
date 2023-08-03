import "./footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Container className="outer-rectangle" fluid>
      <Container class="inner-rectangle" fluid>
        <Row className="text-center p-4 pt-5 pb-0 justify-content-center">
          <Col xs={{ order: "first" }} lg="1">
            About
          </Col>
          <Col xs lg="1">
            Support
          </Col>
          <Col xs lg="1">
            Contact
          </Col>
          <Col xs lg="1">
            Privacy
          </Col>
          <Col xs lg="1">
            Resources
          </Col>
          <Col xs={{ order: "last" }} lg="1">
            Terms
          </Col>
        </Row>
      </Container>
      <Row className="text-center">
        <Col xs className="bottom-text">
          @2023LLC.AllRightsReserved
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
