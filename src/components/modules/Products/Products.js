import React, { useContext, useEffect, useState } from "react";
import { Variables } from "../../store/Variables";
import ProductItem from "./ProductItem/ProductItems";
import axios from "axios";
import ProductCategory from "./ProductCategory/ProductCategory";
import "./Products.css";
import { baseUrl } from "../../../keys";

const Products = () => {
  const { productList } = useContext(Variables);
  const [categories, setCategories] = useState({});
  // console.log("products");

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
        {/* {Object.keys(categories).map((product) => {
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
      })} */}

        {/* {productList.map((product) => {
        return (
          <ProductItem
            key={Math.random()}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
          ></ProductItem>
        );
      })} */}
      </section>
    </section>
  );
};

export default Products;
