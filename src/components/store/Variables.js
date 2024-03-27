import { createContext } from "react";

export const Variables = createContext({
  productList: [],
  cartList: [],
  toursList: [],
  removeItem: () => {},
  addItem: () => {},
});
