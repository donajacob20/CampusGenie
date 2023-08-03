import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardImage2 from "../../components/cards/Cardimage2";
import RegisterForm from "./registerform";
import "./register.css";

function RegisterPage() {
  return (
    <Container className="background-container-1" fluid>
      <Row>
      <Col xs={{ span: 6, offset: 1}}>
      <Row className="bg-container-reg ">
        <Col>
          <RegisterForm />
        </Col>
      
    
      </Row>

      </Col>

      <Col className="text-center d-none d-sm-block" >
        <CardImage2 />
      </Col>
      </Row>

      <Container>
        <div style={{ marginTop: "20px" }}></div>
      </Container>
    </Container>
  );
}

export default RegisterPage;
