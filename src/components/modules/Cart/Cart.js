import React, { useEffect } from "react";
import { CloseButton } from "react-bootstrap";
import { useContext, useState } from "react";
import { Variables } from "../../store/Variables";
import CartItem from "./CartItem/CartItem";
import "./Cart.css";
import axios from "axios";

function Cart(props) {
  const { cartList } = useContext(Variables);
  useEffect(()=>{
    console.log("cart  list  change:::")
    console.log(cartList)
  },[cartList])



  return (
    <div className="cart-background">
      <div className="cart-container">
        <div className="cart-header">
          <h2>CART</h2>
          <div className="close-btn">
            <CloseButton
              onClick={() => props.handleCartClose(false)}
            ></CloseButton>
          </div>
        </div>
        {/* {console.log(cartList)} */}
         
          <div className="cart-list">
            {cartList.map((product) => {
              // console.log(product.title);
              return (
                <CartItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  quantity={product.quantity}
                />
              );
            })}
          </div>
        
        <div className="total"></div>
      </div>
    </div>
  );
}

export default Cart;
