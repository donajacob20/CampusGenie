import Card from "react-bootstrap/Card";
import child from "../../assets/child.png";
function CardImage2() {
  return (
    <Card
      className="cardimg  "
      style={{ height: "30rem", width: "400px", borderRadius: "50px" }}
    >
      <Card.Img
        variant="top"
        src={child}
        style={{ height: "30rem", width: "400px" }}
      />
    </Card>
  );
}

export default CardImage2;
