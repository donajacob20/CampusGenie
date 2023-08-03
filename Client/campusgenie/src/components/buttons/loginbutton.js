import Button from "react-bootstrap/Button";
import "./loginbutton.css";
import { useState } from "react";
function LoginButton({ onClick }) {
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <Button className="gradient-btn" type="submit" onClick={formSubmitHandler}>
      {loading ? "Logging In.." : "Login"}
    </Button>
  );
}

export default LoginButton;
