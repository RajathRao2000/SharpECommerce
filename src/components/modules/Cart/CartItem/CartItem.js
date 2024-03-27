import React from "react";
import { Button } from "react-bootstrap";
import "./CartItem.css";
import { useState, useContext } from "react";
import { Variables } from "../../../store/Variables";

function CartItem(props) {
  const _Variables = useContext(Variables);
  const { title, price, imageUrl, quantity } = props;
  const [quant, setQuant] = useState(quantity);
  const handleOnChange = (e) => {
    setQuant(e.target.value);
  };

  return (
    <div className="cart-list">
      <div className="cart-item">
        <div className="cart-img">
          <img src={imageUrl} />
        </div>
        <div className="cart-item-name">{title}</div>
      </div>
      <div className="price">{price}</div>
      <div className="quantity">
        <input
          type="text"
          className="quantity"
          value={quant}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <Button variant="danger" onClick={() => _Variables.removeItem(title)}>
          REMOVE
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
