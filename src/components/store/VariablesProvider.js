import { useState, useEffect } from "react";
import { Variables } from "./Variables";
import { useHistory } from "react-router-dom";
import { crudBaseUrl } from "../../keys";
import axios from "axios";

const VariablesProvider = (props) => {
  const history = useHistory();

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
    cartList: [],
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
    apiToken: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")).token
      : "",
    setToken: setToken,
    clearToken: clearToken,
    userDetails: {
      email: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).email
        : "",
    },
    fetchCart: fetchCartItems,
  });

  const BASEURL_EMAIL = `${crudBaseUrl}/${variables.userDetails.email.replace(
    /[@.]/g,
    ""
  )}`;

  async function fetchCartItems() {
    const res = await axios.get(`${BASEURL_EMAIL}.json`);
    const data = res.data;
    if (data) {
      const processedData = Object.keys(data).map((ele) => {
        console.log(data[ele]);
        const { title, imageUrl, price, productId, quantity } = data[ele];
        return {
          id: ele,
          title,
          imageUrl,
          price,
          quantity,
          productId,
        };
      });

      // console.log(processedData);
      setVariables((prev) => {
        let newList = { ...prev };

        newList.cartList = [...processedData];
        console.log(newList);
        // console.log(newList.cartList)
        return newList;
      });
    }

    // return data
  }
  useEffect(() => {
    fetchCartItems();
  }, []);
  // useEffect(()=>{
  //   console.log("useeffect",variables)
  // },[variables])

  function removeItemFromCart(productName, id) {
    console.log(productName, id);
    console.log("in remove cart");
    try {
      axios.delete(`${BASEURL_EMAIL}/${id}.json`).then((res) => {
        // console.log(res)
        // fetchCartItems()
        console.log(res);
        setVariables((prev) => {
          const newList = { ...prev };
          console.log(newList);
          const arr = newList.cartList.filter((product) => {
            console.log(product);
            return product.id !== id;
          });
          console.log(arr);
          return newList;
        });
      });
    } catch (err) {
      console.log("delete err", err);
    }

    setVariables((prev) => {
      let newList = { ...prev };
      newList.cartList = newList.cartList.filter((product) => {
        return product.title !== productName;
      });
      return newList;
    });
  }

  async function addItemToCart(_title, _price, _imageUrl, _productId) {
    // setIsRequesting(true)

    let item_preExists = false;
    console.log(
      "In add items to cart: ",
      _title,
      _price,
      _imageUrl,
      _productId,
      "||"
    );
    // console.log(
    //   `${crudBaseUrl}/${PARAM_EMAIL}`
    // );
    console.log("baseurl", BASEURL_EMAIL + ".json");
    try {
      const CartItemsResponse = await axios.get(`${BASEURL_EMAIL}.json`);
      const CartItems = CartItemsResponse.data || {};

      const CartItems_keys = Object.keys(CartItems);
      console.log(CartItems_keys);

      for (let i = 0; i < CartItems_keys.length; i++) {
        const { title, price, imageUrl, productId, quantity } =
          CartItems[CartItems_keys[i]];
        console.log(CartItems[CartItems_keys[i]], "||");

        if (_productId === productId) {
          item_preExists = true;
          try {
            const item_patchRes = await axios.patch(
              `${BASEURL_EMAIL}/${CartItems_keys[i]}.json`,
              {
                quantity: quantity + 1,
              }
            );
            console.log("successful patch response::", item_patchRes.data);
            setVariables((prev) => {
              const newList = { ...prev };

              newList.cartList.forEach((cartItem, i) => {
                if (cartItem.productId == _productId) {
                  newList.cartList[i].quantity += 1;
                }
              });
              console.log("patched list", newList);
              return newList;
            });
          } catch (error) {
            console.log("error in item patch::", error);
          }
          break;
        }
      }

      if (!item_preExists) {
        try {
          const item_postRes = await axios.post(`${BASEURL_EMAIL}.json`, {
            title: _title,
            imageUrl: _imageUrl,
            productId: _productId,
            price: _price,
            quantity: 1,
          });
          console.log("successful post response::", item_postRes.data);

          setVariables((prev) => {
            const newList = { ...prev };
            newList.cartList.push({
              title: _title,
              price: _price,
              imageUrl: _imageUrl,
              quantity: 1,
              productId: _productId,
            });
            return newList;
          });
        } catch (error) {
          console.log("error in item post::", error);
        }
      }
    } catch (err) {
      console.log(err);
    }
    // setIsRequesting(false)
    return "success";
  }

  // useEffect(() => {
  //   // console.log("settoken", variables);
  // }, [variables]);

  function clearToken() {
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = "";
      localStorage.removeItem("token");
      return newContext;
    });
  }

  function setToken(token, email) {
    // console.log("settoken",token)
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = token;
      newContext.userDetails.email = email;
      const obj = {
        token: token,
        date: new Date(),
        email: email,
      };
      localStorage.setItem("token", JSON.stringify(obj));
      // console.log(token, newContext);
      return newContext;
    });
  }

  return (
    <Variables.Provider value={variables}>{props.children}</Variables.Provider>
  );
};

export default VariablesProvider;
