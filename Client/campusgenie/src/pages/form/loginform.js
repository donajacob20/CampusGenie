import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import LoginButton from "../../components/buttons/loginbutton";
import "./loginform.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToastMessage, successToastMessage } from "../../App";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../components/statemanagement/authreducer";
import React, { useState } from "react";

function LoginForm() {
  const [profile, setUserProfile] = useState([]);
  const dispatch = useDispatch();
  const handleLoginSuccess = (response) => {
    const accessToken = response.credential;
    axios
      .post(
        "http://localhost:8000/api/register-with-google/",
        { token: accessToken }, // Pass the Google ID to the backend
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {

        setUserProfile();
        successToastMessage();
        navigate("/app/home");
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        dispatch(setAccessToken(response.data.access_token));
        navigate("/chat/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const schema = yup.object().shape({
    email: yup
      .string("email should be a string")
      .email("please provide a valid email address")
      .required("email address is required"),
    password: yup
      .string("password should be a string")
      .required("password is required")
      .min(8, "password should have a minimum length of 8")
      .max(16, "password should have a maximum length of 16"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmitHandler = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/signin/", {
        email: email,
        password: password,
      });

      successToastMessage();
      navigate("/chat/dashboard");
      const access_token = response.data.access;
      const refresh_token = response.data.refresh;
      dispatch(setAccessToken(access_token));
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } catch (error) {
      errorToastMessage();
    }
  };

  return (
    <div>
      <Container className="loginform-box">
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit(formSubmitHandler)}>
              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2" className="text-left">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(data) => setEmail(data.target.value)}
                  />
                  {errors.email ? (
                    <span className="error-text">{errors.email.message}</span>
                  ) : (
                    <></>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2" className="text-left">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(data) => setPassword(data.target.value)}
                  />
                  {errors.password ? (
                    <span className="error-text">
                      {errors.password.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </Col>
              </Form.Group>
              <Row style={{ width: "20rem" }}>
                <Col xs={8} className="mx-auto text-center">
                  <LoginButton onSubmit={handleSubmit(formSubmitHandler)} />
                </Col>
              </Row>

              <Row style={{ width: "14rem" }}>
                <Col xs={8} className="mx-auto text-center">
                  <a
                    className="log-text"
                    style={{ width: "250px", color: "black" }}
                  >
                    Didn't register yet?
                    <Link className="log-text-1" to="/auth/register">
                      Register
                    </Link>
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={8} className="google mx-auto text-center">
                  {profile ? (
                    <GoogleLogin
                      clientId="91360851474-dut75trtfm3mbvafmobfb24q2mm3r12n.apps.googleusercontent.com"
                      onSuccess={handleLoginSuccess}
                      onFailure={handleLoginFailure}
                      accessType="offline"
                      responseType="token"
                    />
                  ) : (
                    <button
                      className="google-logout"
                      onClick={handleLoginFailure}
                    >
                      Log out
                    </button>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
