import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import RegisterButton from "../../components/buttons/registerbutton";

import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './registerform.css';
import { useState } from "react";
import axios from "axios";

import { errorToastMessage, successToastMessage } from '../../App';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";




function RegisterForm() {
    const [firstname, setfirstName] = useState('');
    const [username, setuserName] = useState('');
    const [lastname, setlastName] = useState('');
    const[dob,setDob]=useState('date');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate("");
    const schema = yup.object().shape({
        firstname: yup
            .string("firstname should be a string")
            .required(" firstname is required"),
        username: yup
            .string("username should be a string")
            .required("username is required"),
        lastname: yup
            .string("lastname should be a string")
            .required("lastname is required"),
        email: yup
            .string("email should be a string")
            .email("please provide a valid email address")
            .matches(
                /^[a-zA-Z0-9._-]{1,20}\@[a-zA-Z0-9.-]{1,25}\.[a-zA-Z0-9]{1,5}$/,
                "Invalid email format"
              )
            .required("email address is required"),
        password: yup
            .string("password should be a string")
            .min(8, "password should have a minimum length of 8")
            .max(16, "password should have a maximum length of 16")
            .required("password is required")
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
              ),
        confirm_password: yup
            .string("password should be a string")
            .oneOf([yup.ref("password")], 'passwords must match')
            .required("confirm password is required"),
    
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
   
      const formSubmitHandler = async (data) => {
    try {

      const response = await axios.post('http://localhost:8000/api/signup/', { username,firstname,lastname,dob,email, password,confirm_password,gender});
      if(response.status==201)
      {
        successToastMessage();
        navigate("/auth/signin/");
      }
    } catch (error) {
      errorToastMessage();

    }
  };
  
    return (
        <Container class='col-md-12 content-center'>
            <Row>
                <Form onSubmit={handleSubmit(formSubmitHandler)}>
                    <Row>
                        <Col>
                            <Form.Group as={Col} className="mb-3" controlId="formUsername" >
                                <Form.Label column sm="2">
                                    Username
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        {...register("username")}
                                        type="text"
                                        placeholder="enter username"

                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={(data) => setuserName(data.target.value)}
                                        

                                    />
                                    {errors.username ? (
                                        <span className="error-text1">{errors.username.message}</span>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formFirstname">
                                <Form.Label column sm="2">
                                    Firstname
                                </Form.Label>
                                <Col sm="10">

                                    <Form.Control
                                        {...register("firstname")}
                                        type="text"
                                        placeholder="enter firstname"

                                        name="firstname"
                                        id="firstname"
                                        value={firstname}
                                   onChange={(data) => setfirstName(data.target.value)}
                                    />
                                    {errors.firstname ? (
                                        <span className="error-text1">{errors.firstname.message}</span>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formLastname">
                                <Form.Label column sm="2">
                                    Lastname
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        {...register("lastname")}
                                        type="text"
                                        placeholder="enter lastname"

                                        name="lastname"
                                        id="lastname"
                                        value={lastname}
                                      onChange={(data) => setlastName(data.target.value)}
                                        
                                    />
                                    {errors.lastname ? (
                                        <span className="error-text1">{errors.lastname.message}</span>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="dob">
                                <Form.Label column sm="2">
                                    DOB
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="date"
                                        dateFormat="MM/DD/YYYY"
                                        placeholder="format MM/DD/YYYY"
                                        name="dob"
                                        id="dob"
                                        
                                        value={dob}
                                      onChange={(data) => setDob(data.target.value)}

                                    />

                                </Col>
                            </Form.Group>


                        </Col>
                        <Col>

                            <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        {...register("email")}
                                        type="email"
                                        placeholder="enter email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(data) => setEmail(data.target.value)}
                                    />
                                    {errors.email ? (
                                        <span className="error-text1">{errors.email.message}</span>
                                    ) : (
                                        <></>
                                    )}


                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        {...register("password")}
                                        type="password"
                                        placeholder="enter Password"
                                        name="password"
                                        id="password"
                                        value={password}
                                       onChange={(data) => setPassword(data.target.value)}
                                    />
                                    {errors.password ? (
                                        <span className="error-text1">{errors.password.message}</span>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formConfirmPassword">
                                <Form.Label column sm="2">
                                    Confirmation
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        {...register("confirm_password")}
                                        type="password"
                                        placeholder="confirm Password"

                                        name="confirm_password"
                                        id="confirm_password"
                                        value={confirm_password}
                                       onChange={(data) => setConfirmPassword(data.target.value)}
                                    />
                                    {errors.confirm_password ? (
                                        <span className="error-text1">{errors.confirm_password.message}</span>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check

                                        type="radio"
                                        label="Male"
                                        id="male"
                                        name="gender"
                                        inline
                                        value="M"
                                        checked={gender === "M"}
                                         onChange={(data) => setGender("M")}
                                        
                                    />
                                    <Form.Check

                                        type="radio"
                                        label="Female"
                                        id="female"
                                        name="gender"
                                        inline
                                        value="F"
                                        checked={gender === "F"}
                                         onChange={(data) => setGender("F")}
                                        

                                    />
                                    <Form.Check

                                        type="radio"
                                        label="Other"
                                        id="other"
                                        name="gender"
                                        inline
                                        value="O"
                                       
                                        checked={gender === "O"}
                                        onChange={(data) => setGender("O")}
                                       
                                    />

                                </div>

                            </Form.Group>


                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className="mx-auto">
                            <RegisterButton
                                style={{ width: "100%", padding: "50px" }}
                            ></RegisterButton>
                        </Col>

                        <Row>
                            <Col xs={{ span: 6, offset: 2 }}>
                                <p className="reg-text-3">
                                    Already Registered?
                                    <Link className="reg-text-4" to="/auth/signin">
                                        Login
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </Row>

        </Container>
    );
}

export default RegisterForm;