import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./registerbutton.css";
function RegisterButton() {
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <Button className="register-btn" type="submit" onClick={formSubmitHandler}>
      {loading ? "Registering.." : "Register"}
    </Button>
  );
}

export default RegisterButton;
