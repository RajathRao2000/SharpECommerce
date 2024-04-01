import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../../../keys";

import "./ProductInfo.css";
import { Button } from "react-bootstrap";
import Rating from "./Rating/Rating";
import ProductReview from "./ProductReview/ProductReview";
import { Variables } from "../../../store/Variables";

function ProductInfo() {
  const [productInfo, setProductInfo] = useState("");
  const [mainImage, setMainImage] = useState("");
  const { pathname } = useLocation();
  const { addItem } = useContext(Variables);
  const id = pathname.split("/")[3];

  const fetchProductInfo = async () => {
    try {
      const res = await axios.get(`${baseUrl}/product-list/${id}.json`);
      console.log("proddata", res.data);
      setProductInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  const { category, description, main, previews, price, title } = productInfo;
  useEffect(() => {
    setMainImage(main);
  }, [main]);
  const images = { main, ...previews };

  return (
    <>
      <section id="product-details">
        {/* <h1>ProductDetails</h1> */}
        <div className="imageanddetails">
          <div className="product-img">
            <div className="thumb">
              {Object.keys(images).map((ele) => {
                return (
                  <img
                    key={Math.random()}
                    className="item"
                    onClick={() => {
                      setMainImage(images[ele]);
                    }}
                    src={images[ele]}
                    alt="images"
                  />
                );
              })}
            </div>
            <div className="display-img">
              <img className="main" src={mainImage} />
            </div>
          </div>
          <div className="line"></div>
          <div className="product-details">
            <p className="category">{category}</p>
            <h3 className="title">{title}</h3>
            <Rating />
            <p className="price">
              <div>
                <p style={{ color: "#26a541", fontWeight: "bold", margin: 0 }}>
                  Special Price
                </p>
                Rs {price}
              </div>
              {console.log(title, price, main,id, "||")}
              <Button
                onClick={() => addItem(title, price, main, id)}
                variant="primary"
              >
                Add to Cart
              </Button>
            </p>
            <div className="description">
              <h5>Description:</h5>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="review-details">
        <div className="reviews">
          <h1>Reviews</h1>
          <ProductReview
            name="Rajesh Singh"
            rating="3"
            review="Good Product!!"
            date="1920 October 2023"
          />
          <ProductReview
            name="Aman Kumar"
            rating="5"
            review="Amazing Product!!"
            date="19 October 2023"
          />
        </div>
      </section>
    </>
  );
}

export default ProductInfo;
