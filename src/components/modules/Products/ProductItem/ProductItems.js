import { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Variables } from "../../../store/Variables";
import { NavLink } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = (props) => {
  const _Variables = useContext(Variables);
  const [isRequesting, setIsRequesting] = useState(false);
  const { title, price, imageUrl, id, category } = props;
  console.log("product item", id);

  const handleAddItem = async () => {
    setIsRequesting(true); // Set isRequesting to true initially
    const success =await _Variables.addItem(title, price, imageUrl, id); // Call the addItem function
    console.log(success)
    if (success==="success") {
      setIsRequesting(false); // Set isRequesting to false if addItem returns false
    }
  };

  return (
    <Card
      className={"product-navlink"}
      style={{
        width: "18rem",
      }}
    >
      <Card.Img variant="top" src={imageUrl} className="product-item-img" />
      <Card.Body className="product-card-body">
        <NavLink to={`/product/${category}/${id}`}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {/* <CartBtn onClick={() => _Variables.addItem(title, price, imageUrl)} label="Add to Cart"/>  */}
            Rs {price}
          </Card.Text>
        </NavLink>
        {console.log("isRequesting", isRequesting)}
        {isRequesting ? (
          <Button className="addToCart-btn" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <circle cx={18} cy={12} r={0} fill="white">
                <animate
                  attributeName="r"
                  begin={0.67}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
              <circle cx={12} cy={12} r={0} fill="white">
                <animate
                  attributeName="r"
                  begin={0.33}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
              <circle cx={6} cy={12} r={0} fill="white">
                <animate
                  attributeName="r"
                  begin={0}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
            </svg>
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleAddItem}
            className="addToCart-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.7}
                d="M3 6h19l-3 10H6zm0 0l-.75-2.5M9.992 11h2m2 0h-2m0 0V9m0 2v2M11 19.5a1.5 1.5 0 0 1-3 0m9 0a1.5 1.5 0 0 1-3 0"
              ></path>
            </svg>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
