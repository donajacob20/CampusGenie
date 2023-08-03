import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardImage from "../../components/cards/Cardimage";
import LoginForm from "./loginform";
import "./login.css";
function LoginPage() {
  return (
    <Container className="Background-container" fluid>
      <Container className="login-container">
        <Row>
          <Col>
            <LoginForm />
          </Col>
          <Col className="card-image text-center d-none d-sm-block">
            <CardImage />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginPage;
