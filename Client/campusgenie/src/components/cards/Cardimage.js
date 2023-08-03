import Card from "react-bootstrap/Card";
import child from "../../assets/child.png";
function CardImage() {
  return (
    <Card
      className="cardimg"
      style={{ borderRadius: "50px", width: "400px", height: "400px" }}
    >
      <div className="ratio-container">
        <Card.Img
          variant="top"
          src={child}
          className="img-fluid"
          alt="Child"
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "50px",
          }}
        />
      </div>
    </Card>
  );
}

export default CardImage;
