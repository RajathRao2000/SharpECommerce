import React, { useContext, useEffect, useState } from "react";
import { Variables } from "../../store/Variables";
import ProductItem from "./ProductItem/ProductItems";
import axios from "axios";
import ProductCategory from "./ProductCategory/ProductCategory";
import "./Products.css";
import { baseUrl } from "../../../keys";
import { useHistory } from "react-router-dom";

const Products = () => {
  const { apiToken, clearToken } = useContext(Variables);
  const history = useHistory();
  const [categories, setCategories] = useState({});

  if (localStorage.getItem("token")) {
    const oldDate = new Date(JSON.parse(localStorage.getItem("token")).date);
    const currentDate = new Date();
    // console.log(oldDate,currentDate,(currentDate.getTime()-oldDate.getTime())/60000,Math.floor((currentDate.getTime()-oldDate.getTime())/60000)>5)
    if (Math.floor((currentDate.getTime() - oldDate.getTime()) / 60000) > 5) {
      alert("The token has expired!! Please login again...");
      localStorage.removeItem("token");
      clearToken();
      history.replace("/login");
    }
  }

  // console.log("products");
  useEffect(() => {
    if (!apiToken) {
      history.replace("/login");
      alert("You need to login to access the products page!!");
    }
  }, [apiToken]);

  const fetchCategories = async () => {
    // console.log("in fetch");
    const response = await axios.get(
      `${baseUrl}/product-categories.json?orderBy="name"&startAt="a"`
    );
    // console.log(typeof response.data, response.data);
    setCategories(response.data);
  };

  useEffect(() => {
    try {
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="categories">
      {apiToken ? (
        <>
          <h1>Categories</h1>
          <section className="category-container">
            {Object.keys(categories).map((product) => {
              // console.log(categories, product, categories[product]);
              return (
                <ProductCategory
                  key={product}
                  id={product}
                  title={categories[product].title}
                  name={categories[product].name}
                  price={categories[product].price}
                  imageUrl={categories[product].image}
                  description={categories[product].description}
                ></ProductCategory>
              );
            })}
          </section>
        </>
      ) : (
        "Please login to access this page..."
      )}
    </section>
  );
};

export default Products;
/*

        {Object.keys(categories).map((product) => {
        console.log(categories,product,categories[product])
        return (
          <ProductItem
            key={product}
            title={categories[product].name}
            price={categories[product].price}
            imageUrl={categories[product].image}
            description={categories[product].description}
          ></ProductItem>
        );
      })} 

        {productList.map((product) => {
        return (
          <ProductItem
            key={Math.random()}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
          ></ProductItem>
        );
      })} 
*/
