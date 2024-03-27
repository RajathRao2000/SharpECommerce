import { useState } from "react";
import { Variables } from "./Variables";

const VariablesProvider = (props) => {
  const [variables, setVariables] = useState({
    productList: [
      {
        title: "Colors",
        price: 100,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      },
      {
        title: "Black and white Colors",
        price: 50,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      },
      {
        title: "Yellow and Black Colors",
        price: 70,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      },
      {
        title: "Blue Color",
        price: 100,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      },
    ],
    cartList: [
      {
        title: "Colors",
        price: 100,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        quantity: 2,
      },
      {
        title: "Black and white Colors",
        price: 50,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",

        quantity: 3,
      },
      {
        title: "Yellow and Black Colors",
        price: 70,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        quantity: 1,
      },
    ],
    toursList: [
      {
        date: "JUL16",
        location: "DETROIT, MI",
        place: "DTE ENERGY MUSIC THEATRE",
      },
      {
        date: "JUL19",
        location: "TORONTO,ON",
        place: "BUDWEISER STAGE",
      },
      {
        date: "JUL 22",
        location: "BRISTOW, VA",
        place: "JIGGY LUBE LIVE",
      },
      {
        date: "JUL 29",
        location: "PHOENIX, AZ",
        place: "AK-CHIN PAVILION",
      },
      {
        date: "AUG 2",
        location: "LAS VEGAS, NV",
        place: "T-MOBILE ARENA",
      },
      {
        date: "AUG 7",
        location: "CONCORD, CA",
        place: "CONCORD PAVILION",
      },
    ],
    removeItem: removeItemFromCart,
    addItem: addItemToCart,
  });

  function setIsHome(bool) {
    setVariables((prev) => {
      let newList = { ...prev };
      newList.isHome = bool;
      return newList;
    });
  }

  function removeItemFromCart(productName) {
    setVariables((prev) => {
      let newList = { ...prev };
      newList.cartList = newList.cartList.filter((product) => {
        return product.title != productName;
      });
      return newList;
    });
  }

  function addItemToCart(_title, _price, _imageUrl) {
    setVariables((prev) => {
      let newList = { ...prev };
      let alreadyExists = false;
      newList.cartList.forEach((ele, i) => {
        if (ele.title == _title) {
          // console.log(ele,ele.title,_title)
          alreadyExists = true;
          newList.cartList[i].quantity += 1;
        }
      });
      // console.log(newList,"newList",alreadyExists)
      if (!alreadyExists) {
        newList.cartList.push({
          title: _title,
          price: _price,
          imageUrl: _imageUrl,
          quantity: 1,
        });
      }
      return newList;
    });
  }

  return (
    <Variables.Provider value={variables}>{props.children}</Variables.Provider>
  );
};

export default VariablesProvider;
