import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Variables } from "../../../store/Variables";
import { NavLink } from "react-router-dom";
import "./ProductItem.css"

const ProductItem = (props) => {
  const _Variables = useContext(Variables);
  const { title, price, imageUrl, id, category } = props;

  return (
    <NavLink  to={`/product/${category}/${id}`} className={"product-navlink"}>
    <Card
      style={{
        width: "18rem",
      }}
    >
      <Card.Img  variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {/* <CartBtn onClick={() => _Variables.addItem(title, price, imageUrl)} label="Add to Cart"/>  */}

          Rs {price}
          </Card.Text>
          <Button
          variant="primary"
          onClick={() => _Variables.addItem(title, price, imageUrl)}
        >
          ADD TO CART
        </Button>
      
      </Card.Body>
    </Card>
    </NavLink>
  );
};

export default ProductItem;
