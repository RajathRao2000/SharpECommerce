import React from "react";
import { Button, CloseButton } from "react-bootstrap";
import { useContext } from "react";
import { Variables } from "../../store/Variables";
import CartItem from "./CartItem/CartItem";
import "./Cart.css";

function Cart(props) {
  const { cartList } = useContext(Variables);
  return (
    <div className="cart-background">
      <div className="cart-container">
        <div className="close-btn">
          <CloseButton
            onClick={() => props.handleCartClose(false)}
          ></CloseButton>
        </div>
        <div className="cart-header">CART</div>
        {cartList.map((product) => {
          return (
            <CartItem
              key={Math.random()}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              quantity={product.quantity}
            />
          );
        })}
        <div className="total"></div>
      </div>
    </div>
  );
}

export default Cart;
