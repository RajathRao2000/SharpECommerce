import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItems";
import "./ProductList.css";
import { baseUrl } from "../../../../keys";

function ProductList() {
  const [productList, setProductList] = useState({});
  const [title, setTitle] = useState();

  const { categoryname } = useParams();
  //   console.log("here", categoryname);

  const fetchData = async () => {
    const res = await axios.get(
      `${baseUrl}/product-list.json?orderBy="category"&equalTo="${categoryname}"`
    );
    // console.log(res.data);
    setProductList(res.data);
  };

  useEffect(() => {
    switch (categoryname) {
      case "homeandliving":
        setTitle("Home & Living");
        break;
      case "jewellery":
        setTitle("Jewellery");
        break;
    }
  }, [categoryname]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="product-container">
      <h1>{title}</h1>
      <div className="product-list">
        {Object.keys(productList).map((product) => {
          let temp = productList[product];
          //   console.log(temp);
          return (
            <ProductItem
              key={product}
              id={product}
              category={categoryname}
              title={temp["title"]}
              price={temp["price"]}
              imageUrl={temp["main"]}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
