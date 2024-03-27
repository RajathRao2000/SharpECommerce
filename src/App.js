// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Redirect, Route, Switch} from "react-router-dom"
import "./App.css";
import { Header } from "./components/UI/Header/Header";
import Products from "./components/modules/Products/Products";
import VariablesProvider from "./components/store/VariablesProvider";
import About from "./components/modules/About/About";
import Home from "./components/modules/Home/Home";
import ContactUs from "./components/modules/ContactUs/ContactUs";
import ProductList from "./components/modules/Products/ProductList/ProductList";
import ProductInfo from "./components/modules/Products/ProductInfo/ProductInfo";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <Error />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/products", element: <Products /> },
//       { path: "/about", element: <About /> },
//     ],
//   },
// ]);
function App() {
  return (
    <Switch >
    <VariablesProvider>
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Redirect exact from="/" to="/home" />
      <Header />
      <Route path="/home" >
        <Home />
      </Route>
      <Route path="/about" >
        <About />
      </Route>
      <Route path="/contactus" >
        <ContactUs />
      </Route>
      <Route path="/product" exact>
        <Products />
      </Route>
      <Route path="/product/:categoryname" exact>
        <ProductList />
      </Route>
      <Route path="/product/:categoryname/:productid">
        <ProductInfo />
      </Route>
    </VariablesProvider>
    </Switch>
  );
}

export default App;
//rfce
