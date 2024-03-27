import React, { useContext } from "react";
import ToursItem from "./ToursItem/ToursItem";
import { Variables } from "../../store/Variables";
import "./Home.css";
function Home() {
  const { toursList } = useContext(Variables);
  
  return (
    <section id="tours" className="container">
      <h2>tours</h2>
      <div className="toursList">
        {toursList.map((product) => {
          return (
            <ToursItem
              key={Math.random()}
              date={product.date}
              location={product.location}
              place={product.location}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Home;
