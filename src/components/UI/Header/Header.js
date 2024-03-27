import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import { createPortal } from "react-dom";
import Cart from "../../modules/Cart/Cart";
import { Variables } from "../../store/Variables";
import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const { cartList } = useContext(Variables);
  const [shouldCartRender, setShouldCartRender] = useState(false);
  const location=useLocation()

  const handlerViewCart = (boolean) => {
    setShouldCartRender(boolean);
  };

  return (
    <div id="head-components">
      <header className="header">
        <div>{/*This div is to center the navlinks*/}Be Unique</div>
        <nav className="nav-link-group">
          <NavLink to="/about" className={`${isActive=>(isActive?"active":"")}`}> ABOUT</NavLink>
          <NavLink to="/home"className={`${isActive=>(isActive?"active":"")}`}> HOME</NavLink>
          <NavLink to="/product"className={`${isActive=>(isActive?"active":"")}`}> STORE</NavLink>
          <NavLink to="/contactus"className={`${isActive=>(isActive?"active":"")}`}> CONTACT US</NavLink>
        </nav>
        <Button
          id="nav-btn"
          variant="dark"
          onClick={() => handlerViewCart(true)}
          type="button"
        >
          Cart<span className="cart-count">{cartList.length}</span>
        </Button>
        {createPortal(
          shouldCartRender ? <Cart handleCartClose={handlerViewCart} /> : null,
          document.getElementById("cart")
        )}
      </header>
      <div className="banner">
        {/* <p>The Generics</p> */}
        <p>Be Unique</p>
        {location.pathname=="/home" ? (
          <>
            <button className="latest-album">Get our Latest Album</button>
            <button className="play-btn">▹</button>
          </>
        ) : null}
      </div>
    </div>
  );
};
