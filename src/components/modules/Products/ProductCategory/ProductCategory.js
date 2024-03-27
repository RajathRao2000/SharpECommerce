import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Variables } from "../../../store/Variables";
import { NavLink } from "react-router-dom";
import "./ProductCategory.css";

const ProductCategory = (props) => {
  const _Variables = useContext(Variables);
  const { title, imageUrl, id, description, name } = props;
  return (
    <NavLink className={`category-navlink`} to={`product/${name}`}>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </NavLink>
  );
};

export default ProductCategory;
