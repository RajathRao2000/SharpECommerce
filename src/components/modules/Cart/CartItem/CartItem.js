import React from "react";
import { Button } from "react-bootstrap";
import "./CartItem.css";
import { useState, useContext } from "react";
import { Variables } from "../../../store/Variables";
import thrash from "./trash-svgrepo-com.svg";

function CartItem(props) {
  const {removeItem} = useContext(Variables);
  const { title, price, imageUrl, quantity, id } = props;
  // const [quant, setQuant] = useState(quantity);
  // const handleOnChange = (e) => {
  //   setQuant(e.target.value);
  // };

  const handleOnBlur=()=>{

  }

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={imageUrl} />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name">
          <p>{title.slice(0,21)}...</p>
        </div>
        <div className="cart-price-quantity">
        Rs {price}
        <input
          type="number"
          className="input-quantity"
          value={quantity}
          // onChange={(e) => {
          //   handleOnChange(e);
          // }}
          onBlur={handleOnBlur}
        />
        </div>
      </div>
      <div className="cart-thrash-btn">
        <Button variant="danger" onClick={() => removeItem(title,id)}>
          <img className="thrash-img" src={thrash} />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
